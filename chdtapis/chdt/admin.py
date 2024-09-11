from django.contrib import admin

from .models import Catalog, User, Product, Detail, Address, Order, OrderItem, Review


# Register your models here.


class ChdtserverAdmin(admin.AdminSite):
    site_header = 'Hệ thống quản lý bán hàng điện tử'


admin_site = ChdtserverAdmin(name='CHDTAdmin')

admin_site.register(User)
admin_site.register(Catalog)
admin_site.register(Product)
admin_site.register(Detail)
admin_site.register(Address)
admin_site.register(Order)
admin_site.register(OrderItem)
admin_site.register(Review)
