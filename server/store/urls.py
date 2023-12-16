from django.urls import path

from store import views

app_name = "store"

urlpatterns = [
    path("product/", views.ProductListView.as_view(), name="store_home"),
    path("category/", views.CategoryListView.as_view(), name="categories"),
    path("product/<slug:slug>/", views.ProductView.as_view(), name="product"),
    path("category/<slug:slug>/", views.CategoryItemView.as_view(), name="category_item"),
]