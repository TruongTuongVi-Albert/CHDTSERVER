from itertools import product
from time import timezone

from django.db.models import Count, Sum
from django.shortcuts import render
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from . import serializers
from .models import User, Catalog, Product, Detail, Address, Order, OrderItem, Review
from .serializers import OrderSerializer


class UserViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer

    def get_permissions(self):
        if self.action in ['get_current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-user', detail=False)
    def get_current_user(self, request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializer(user).data)


class AddressViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Address.objects.filter(active=True)
    serializer_class = serializers.AddressSerializer


class CatalogViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Catalog.objects.filter(active=True)
    serializer_class = serializers.CatalogSerializer


class ProductViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

        return queryset


class DetailViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Detail.objects.filter(active=True)
    serializer_class = serializers.DetailSerializer


class OrderViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Order.objects.filter(active=True)
    serializer_class = serializers.OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = OrderItem.objects.filter(active=True)
    serializer_class = serializers.OrderItemSerializer

    def create(self, request, *args, **kwargs):
        # Logic để thêm sản phẩm vào giỏ hàng
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Tính toán lại tổng tiền và cập nhật vào đơn hàng
        order = serializer.instance.order
        order.total_price = self.calculate_total_price(order)
        order.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        # Logic để cập nhật số lượng sản phẩm
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Tính toán lại tổng tiền và cập nhật vào đơn hàng
        order = serializer.instance.order
        order.total_price = self.calculate_total_price(order)
        order.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        # Logic để xóa sản phẩm khỏi giỏ hàng
        instance = self.get_object()
        self.perform_destroy(instance)
        # Tính toán lại tổng tiền và cập nhật vào đơn hàng
        order = instance.order
        order.total_price = self.calculate_total_price(order)
        order.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def calculate_total_price(self, order):
        # Logic để tính tổng tiền của đơn hàng
        order_items = OrderItem.objects.filter(order=order)
        total_price = sum(item.quantity * item.product.price for item in order_items)
        return total_price


class ReviewViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Review.objects.filter(active=True)
    serializer_class = serializers.ReviewSerializer


class PaymentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated, ]

    def create_order(self, request):
        # Lấy thông tin từ request
        address_id = request.data.get('address_id')
        cart = request.data.get('cart')  # Giả định cart là danh sách sản phẩm với số lượng

        if not address_id or not cart:
            return Response({"error": "Address and cart are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Tạo đơn hàng
        order = Order(
            user=request.user,
            address_id=address_id,
            email=request.user.email,
            status='Pending',  # Trạng thái mặc định
            total_price=0,
            total_quantity=0,
            created_at=timezone.now(),
        )
        order.save()

        total_price = 0
        total_quantity = 0

        for item in cart:
            product_id = item.get('product_id')
            quantity = item.get('quantity')

            if not product_id or not quantity:
                return Response({"error": "Product ID and quantity are required."}, status=status.HTTP_400_BAD_REQUEST)

            # Kiểm tra sản phẩm có tồn tại
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({"error": f"Product with id {product_id} does not exist."},
                                status=status.HTTP_404_NOT_FOUND)

            # Tạo order item
            order_item = OrderItem(
                order=order,
                product=product,
                quantity=quantity
            )
            order_item.save()

            total_price += product.detail.price * quantity  # Giả định giá nằm trong model Detail
            total_quantity += quantity

        # Cập nhật tổng giá và tổng số lượng cho đơn hàng
        order.total_price = total_price
        order.total_quantity = total_quantity
        order.save()

        # Xóa giỏ hàng nếu cần
        request.session['cart'] = {}

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


def order_stats(request):
    # Get order statistics grouped by year
    orders = Order.objects.values('created_at__year').annotate(
        total_orders=Count('id'),
        total_revenue=Sum('total_price')
    ).order_by('created_at__year')

    years = [order['created_at__year'] for order in orders]
    total_orders = [order['total_orders'] for order in orders]
    total_revenue = [order['total_revenue'] for order in orders if order['total_revenue'] is not None]

    context = {
        'years': years,
        'total_orders': total_orders,
        'total_revenue': total_revenue,
    }

    return render(request, 'stats.html', context)
