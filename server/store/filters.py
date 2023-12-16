import django_filters
from django_filters.rest_framework import FilterSet
from .models import Product


class ProductFilter(FilterSet):
    category_id = django_filters.AllValuesMultipleFilter(field_name='category_id')

    class Meta:
        model = Product
        fields = {
            'category_id': ['exact'],
            'is_hit': ['exact'],
            'is_recommendation': ['exact'],
            'is_discount': ['exact'],
            'regular_price': ['gt', 'lt']
        }
