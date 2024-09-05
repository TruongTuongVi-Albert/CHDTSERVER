from rest_framework import serializers
from .models import User
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