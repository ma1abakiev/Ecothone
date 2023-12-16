from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import mark_safe

from account.forms import CustomUserCreationForm, CustomUserChangeForm
from account.models import User, City


@admin.register(User)
class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Dates", {"fields": ("last_login", "date_joined")}),
        ('required', {
                 'fields': ('first_name', 'last_name', 'profile_photo', 'get_photo')}),
        ('Organization', {'fields': ('organization_name', 'organization_phone_number')})
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    model = User

    ordering = ["email"]

    list_display = ('id', 'email', 'first_name', 'last_name')
    list_display_links = ('id', 'email')
    readonly_fields = ('get_photo',)

    def get_photo(self, obj):
        return mark_safe(f'<img src={obj.profile_photo.url} width="100" height="110"')

    get_photo.short_description = "profile_photo"


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
