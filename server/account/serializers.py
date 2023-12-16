from django.contrib.auth import authenticate
from rest_framework import serializers

from account.models import User, City, Organization, Favorite


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize CustomUser model.
    """

    class Meta:
        model = User
        fields = ("id", 'first_name', 'last_name', 'organization_name', 'organization_phone_number', 'city',
                  'address', "email")


# class OrganizationSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = User
#         fields = ("id", 'name', 'phone_number')


class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", 'first_name', 'last_name', 'city', 'address', "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data['role'] = 'customer'
        return User.objects.create_user(**validated_data)


class OrganizationRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", 'first_name', 'last_name', 'city', 'address', 'organization_name',
                  'organization_phone_number', "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data['role'] = 'organization'
        return User.objects.create_user(**validated_data)


# class OrganizationRegistrationSerializer(serializers.ModelSerializer):
#     organization_name = serializers.CharField(max_length=100)
#     organization_phone_number = serializers.CharField(max_length=100)
#
#     class Meta:
#         model = User
#         fields = ("id", 'first_name', 'last_name', 'city', 'address', "email", 'password',
#                   'organization_name', 'organization_phone_number')
#         extra_kwargs = {"password": {"write_only": True}}


class UserLoginSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorite
        fields = '__all__'
