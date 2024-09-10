from itertools import product

from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from . import serializers
from .models import User, Catalog, Product, Detail, Address, Order, OrderItem, Review


class UserViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer


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

    @action(methods=['get'], url_path='details', detail=True)
    def get_details(self, request, pk):
        detail = self.get_object().details_set.filter(active=True)

        q = request.query_params.get('q')
        if q:
            details = detail.filter(subject__icontains=q)

        return Response(serializers.LessonSerializer(details, many=True).data,
                        status=status.HTTP_200_OK)


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
