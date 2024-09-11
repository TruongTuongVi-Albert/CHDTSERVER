from django.contrib import admin

from django.urls import path
from django.urls import include
from rest_framework import routers

from . import views, admin
from .dao import order_stats


r = routers.DefaultRouter()

r.register('users', views.UserViewSet, 'users')
r.register('catalogs', views.CatalogViewSet, 'catalogs')
r.register('products', views.ProductViewSet, 'products')
r.register('details', views.DetailViewSet, 'details')
r.register('orders', views.OrderViewSet, 'orders')
r.register('orders_items', views.OrderItemViewSet, 'orders_items')
r.register('addresses', views.AddressViewSet, 'addresses')
r.register('reviews', views.ReviewViewSet, 'reviews')

urlpatterns = [
    path('', include(r.urls)),
    path('stats/', views.order_stats, name='order_stats'),
]
