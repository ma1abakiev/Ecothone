from rest_framework import serializers

from store.models import ProductImage, Product, Category


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "alt_text"]


class ProductSerializer(serializers.ModelSerializer):
    product_image = ImageSerializer(many=True, read_only=True)
    discount_price = serializers.SerializerMethodField()

    def get_discount_price(self, obj):
        if obj.is_discount:
            return obj.discount_price
        return None

    class Meta:
        model = Product
        fields = ["id", "category", "title", "description", "slug",
                  "regular_price", 'discount_price', "product_image"]


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'children',)
