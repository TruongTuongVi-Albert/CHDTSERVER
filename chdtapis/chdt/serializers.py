from rest_framework import serializers
from .models import User, Category, Product, Order, OrderProduct, Review
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):
    # Từ cloud tạo 1 linh gửi xuống sql và từ sql gửi lên admin

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['avatar'] = instance.avatar.url

        return rep

    def create(self, validated_data):
        # Băm mật khẩu
        data = validated_data.copy()
        user = User(**data)
        user.set_password(data['password'])
        user.save()
        return user

    class Meta:
        # Lấy dữ liệu từ sql
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True, # Chỉ được sửa khi là admin
            }
        }


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'code', 'create_date', 'update_date', 'active')


class ProductsSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.code)
        instance.save()
        return instance

    def delete(self, instance, validated_data):
        instance.delete()
        return instance

    def quantity(self, instance, validated_data):
        quantity = validated_data.get('quantity', instance.quantity)
        if quantity < 0:
            instance.active = False
        instance.quantity = quantity
        instance.save()
        return instance
    def get_average_rating(self, obj):
        return obj.average_rating()

    def get_total_reviews(self, obj):
        return obj.total_reviews()

    class Meta:
        model = Product
        fields = ('id', 'code', 'images', 'name', 'create_date', 'update_date', 'active')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('code', 'total_price', 'total_quantity', 'products')


class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ('order', 'product', 'quantity')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'product_code', 'rating', 'comment', 'created_at')