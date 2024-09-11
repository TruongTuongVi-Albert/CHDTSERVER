from django.shortcuts import render
from django.db.models import Count, Sum
from .models import Order


def order_stats(request):
    # Lấy thống kê đơn hàng theo năm
    orders = Order.objects.values('created_at__year').annotate(
        total_orders=Count('id'),
        total_revenue=Sum('total_price')
    ).order_by('created_at__year')

    years = [order['created_at__year'] for order in orders]
    total_orders = [order['total_orders'] for order in orders]
    total_revenue = [order['total_revenue'] for order in orders if order['total_revenue'] is not None]

    context = {
        'years': years,
        'total_orders': total_orders,
        'total_revenue': total_revenue,
    }

    return render(request, 'stats.html', context)
