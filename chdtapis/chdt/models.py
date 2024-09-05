from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class BaseModel(models.Model):
    create_date = models.DateField(auto_now_add=True, null=True)
    update_date = models.DateField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    avatar = CloudinaryField(null=False)

    ROLE_CHOICES = {
        ('admin', 'Quản Trị Viên'),
        ('customer', 'Khách hàng'),
        ('staff', 'Nhân viên'),
    }

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='admin')

    class Meta:
        verbose_name_plural = 'Tài Khoản Người Dùng'

    def __str__(self):
        return self.username

# Nhân viên
class Staff(BaseModel):
    #id tự tạo
    code = models.CharField(max_length=10, unique=True, null=False)
    name = models.CharField(max_length=120, null=False)
    email = models.EmailField(unique=True, null=False)
    date_joined = models.DateField(auto_now_add=True, null=False)
    birthday = models.DateField(null=False)
    number_phone = models.CharField(max_length=11, null=False)
    address = models.CharField(max_length=125, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, limit_choices_to={'active': True})

    class Meta:
        verbose_name_plural = 'Nhân Viên'

    def __str__(self):
        return self.name

class Customer(BaseModel):
    code = models.CharField(max_length=10, unique=True, null=False)
    name = models.CharField(max_length=120, null=False)
    email = models.EmailField(unique=True, null=False)
    number_phone = models.CharField(max_length=11, null=False)
    birthday = models.DateField(null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, limit_choices_to={'active': True})


    class Meta:
        verbose_name_plural = 'Nhân Viên'

    def __str__(self):
        return self.name


