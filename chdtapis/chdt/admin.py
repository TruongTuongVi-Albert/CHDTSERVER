from django.contrib import admin

from .models import User


# Register your models here.


class ChdtserverAdmin(admin.AdminSite):
    site_header = 'Hệ thống quản lý bán hàng điện tử'




admin_site = ChdtserverAdmin(name = 'CHDTAdmin')

admin_site.register(User)