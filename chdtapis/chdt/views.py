# Views là hiện lên trang admin
from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status

from . import serializers
from .models import User, Category, Product, Order, OrderProduct, Review


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True) # is: là đang hoạt động
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

            user_id = self.request.query_params.get('user_id')
            if user_id:
                queryset = queryset.filter(user_id=user_id)

        return queryset

class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = serializers.CategorySerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

            cate_code = self.request.query_params.get('category_code')
            if cate_code:
                queryset = queryset.filter(category_code=cate_code)

        return queryset


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = serializers.ProductsSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

            pro_code = self.request.query_params.get('product_code')
            if pro_code:
                queryset = queryset.filter(product_code=pro_code)

        return queryset


class OrderViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Order.objects.filter(active=True)
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

            odr_code = self.request.query_params.get('order_code')
            if odr_code:
                queryset = queryset.filter(order_code=odr_code)

        return queryset

    def create(self, request):
        cart = request.data.get('cart', {})  # Giả định rằng giỏ hàng được gửi dưới dạng JSON

        if not cart:
            return Response({"error": "Giỏ hàng không có sản phẩm."}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(code='ORDER_CODE', total_price=0, total_quantity=0)

        for product_code, item in cart.items():
            try:
                product = Product.objects.get(code=product_code)
            except Product.DoesNotExist:
                return Response({"error": f"Sản phẩm {product_code} không tồn tại."}, status=status.HTTP_404_NOT_FOUND)

            quantity = item.get('quantity', 1)
            order_product, created = OrderProduct.objects.get_or_create(order=order, product=product)
            order_product.quantity += quantity
            order_product.save()

            # Cập nhật tổng số lượng và giá
            order.total_quantity += quantity
            order.total_price += product.price * quantity

        order.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

    # Nhận giỏ hàng từ request của client, tạo một đơn hàng mới và thêm các sản phẩm vào đơn hàng.
    def create(self, request):
        cart = request.data.get('cart', {})

        if not cart:
            return Response({"error": "Giỏ hàng không có sản phẩm."}, status=status.HTTP_400_BAD_REQUEST)

        order_code = "ORDER_CODE"  # Có thể tạo mã đơn hàng ngẫu nhiên hoặc theo logic của bạn
        order = Order.objects.create(code=order_code)

        total_price = 0
        total_quantity = 0

        for product_code, item in cart.items():
            try:
                product = Product.objects.get(code=product_code)
            except Product.DoesNotExist:
                return Response({"error": f"Sản phẩm {product_code} không tồn tại."}, status=status.HTTP_404_NOT_FOUND)

            quantity = item.get('quantity', 1)
            order_product, created = OrderProduct.objects.get_or_create(order_code=order, product_code=product)
            order_product.quantity += quantity
            order_product.save()

            # Cập nhật tổng số lượng và giá
            total_quantity += quantity
            total_price += product.price * quantity

        # Cập nhật thông tin tổng của đơn hàng
        order.total_quantity = total_quantity
        order.total_price = total_price
        order.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

    # Trả về danh sách tất cả các đơn hàng.
    def list(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    # Nhận mã đơn hàng (pk) và trả về thông tin chi tiết của đơn hàng đó
    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({"error": "Đơn hàng không tồn tại."}, status=status.HTTP_404_NOT_FOUND)

    # Xóa đơn hàng theo mã đơn hàng (pk).
    def destroy(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk)
            order.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Order.DoesNotExist:
            return Response({"error": "Đơn hàng không tồn tại."}, status=status.HTTP_404_NOT_FOUND)


class OrderProductViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OrderProduct.objects.filter(active=True)
    serializer_class = serializers.OrderProductSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

            opr_code = self.request.query_params.get('order_product_code')
            if opr_code:
                queryset = queryset.filter(order_product_code=opr_code)

        return queryset


class ReviewViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]  # Chỉ cho phép người dùng đã xác thực

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Gán người dùng hiện tại vào đánh giá

