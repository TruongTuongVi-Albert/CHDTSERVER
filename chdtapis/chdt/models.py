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

class Category(BaseModel):
    code = models.CharField(max_length=10, unique=True, null=False)
    name = models.CharField(max_length=255, null=False)

    class Meta:
        verbose_name_plural = 'Danh Mục'

    def __str__(self):
        return self.name


# Product(Sản Phẩm)
class Product(BaseModel):
    code = models.CharField(max_length=10, unique=True, null=False)
    name = models.CharField(max_length=225, null=False)
    quantity = models.IntegerField(default=0, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True)
    images = CloudinaryField(null=False)

    class Meta:
        verbose_name_plural = 'Sản Phẩm'

    def __str__(self):
        return self.name

    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return sum(review.rating for review in reviews) / reviews.count()
        return 0


# Order(Đơn Hàng)
class Order(BaseModel):
    code = models.CharField(max_length=10, unique=True, null=False)
    total_price = models.IntegerField(null=False, default=1)
    total_quantity = models.IntegerField(null=False, default=1)
    product_code = models.ManyToManyField(Product, related_name="product_code")

    class Meta:
        verbose_name_plural = 'Đơn Hàng'

    def __str__(self):
        return self.code


# OrderProduct(Sản Phẩm trong Đơn Hàng)
class OrderProduct(BaseModel):
    order_code = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_code = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        verbose_name_plural = 'Sản Phẩm trong Đơn Hàng'

    def __str__(self):
        return f"{self.order_code.code} - {self.product_code.name}"


# Reviewer(Đánh Gia)
class Review(BaseModel):
    product_code = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1),  # Giá trị tối thiểu là 1
            MaxValueValidator(5)  # Giá trị tối đa là 5
        ]
    )  # Điểm số từ 1 đến 5
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Đánh Giá Sản Phẩm'

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating})"


class ShippingTracking(BaseModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='shipping_tracking')
    tracking_number = models.CharField(max_length=50, unique=True, null=False)
    status = models.CharField(max_length=50, choices=[
        ('pending', 'Chưa giải quyết'),
        ('shipped', 'Đã vận chuyển'),
        ('in_transit', 'Đang vận chuyển'),
        ('delivered', 'Đã giao hàng'),
        ('returned', 'Đã trả lại'),
        ('canceled', 'Đã huỷ'),
    ], default='pending')
    estimated_delivery_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Theo Dõi Đơn Hàng'

    def __str__(self):
        return f"{self.order.code} - {self.tracking_number} - {self.status}"


