from rest_framework import serializers
from .models import LoanProduct, LoanApplication, Wishlist


class LoanProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanProduct
        fields = [
            'id', 'name', 'category', 'description', 'min_amount', 'max_amount',
            'interest_rate', 'repayment_period_months', 'requires_collateral',
        ]


class LoanApplicationSerializer(serializers.ModelSerializer):
    loan_product_name = serializers.CharField(source='loan_product.name', read_only=True)

    class Meta:
        model = LoanApplication
        fields = [
            'id', 'loan_product', 'loan_product_name', 'amount_requested',
            'monthly_income', 'years_in_business', 'purpose',
            'status', 'decision_reason', 'created_at',
        ]
        read_only_fields = ['id', 'status', 'decision_reason', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class WishlistSerializer(serializers.ModelSerializer):
    loan_product_detail = LoanProductSerializer(source='loan_product', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'loan_product', 'loan_product_detail', 'added_at']
        read_only_fields = ['id', 'added_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)