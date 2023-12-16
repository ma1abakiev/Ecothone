from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from account import views

urlpatterns = [
    path("register/", views.UserRegistrationAPIView.as_view(), name="create-user"),
    path("register-org/", views.OrganizationRegistrationAPIView.as_view(), name="create-org"),
    path("login/", views.UserLoginAPIView.as_view(), name="login-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout-user"),

    path('favorite/', views.UserFavoritesListView.as_view(), name='city-list'),
    path('favorite/toggle/', views.FavoriteToggleView.as_view(), name='city-list'),
    path('city/', views.CityListView.as_view(), name='city-list')
]
