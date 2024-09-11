
from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField


# Base model with create/update fields
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


# User model (v2_user table)
class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    balance_mem = models.IntegerField(null=True, blank=True)
    discount = models.IntegerField(null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    last_login_at = models.DateTimeField(null=True, blank=True)
    avatar = CloudinaryField('image', null=True)
    membership = models.CharField(max_length=50, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


# Catalog model (v2_catalogs table)
class Catalog(BaseModel):
    catalog_name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.catalog_name


# Product model (v2_products table)
class Product(BaseModel):
    product_name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, null=True, blank=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    specifications = models.TextField(null=True, blank=True)
    catalog = models.ForeignKey(Catalog, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.product_name


# Detail model (v2_details table)
class Detail(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    storage = models.CharField(max_length=50, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=50, null=True, blank=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    installment = models.BooleanField(null=True, blank=True)
    trade_in_sale = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.product.product_name} - {self.storage} - {self.color}"


# Review model (v2_rate table)
class Review(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.FloatField()
    review = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.product.product_name}"


# Address model (v2_address table)
class Address(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    address = models.TextField()
    phone_number = models.CharField(max_length=20)
    address_type = models.CharField(max_length=10, choices=[
        ('Home', 'Home'),
        ('Work', 'Work'),
        ('Other', 'Other')
    ])

    def __str__(self):
        return f"{self.full_name} - {self.address_type}"


# Order model (v2_order table)
class Order(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255)
    status = models.CharField(max_length=10, choices=[
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled')
    ])
    total_price = models.IntegerField()
    total_quantity = models.IntegerField()
    status_ship = models.CharField(max_length=10, choices=[
        ('Pending', 'Pending'),
        ('In Transit', 'In Transit'),
        ('Delivered', 'Delivered')
    ])
    status_payment = models.CharField(max_length=10, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed')
    ])

    def __str__(self):
        return self.email


# OrderItems model (v2_order_items table)
class OrderItem(BaseModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.order.email} - {self.product.product_name}"
