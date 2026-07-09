from django.conf import settings
from django.db import models


class LoanProduct(models.Model):
    CATEGORY_CHOICES = [
        ('retail', 'Retail / Kiosk'),
        ('agriculture', 'Agriculture'),
        ('transport', 'Transport'),
        ('services', 'Services'),
        ('manufacturing', 'Manufacturing / Artisan'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    min_amount = models.DecimalField(max_digits=12, decimal_places=2)
    max_amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, help_text="Annual %")
    repayment_period_months = models.PositiveIntegerField()
    requires_collateral = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class LoanApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    loan_product = models.ForeignKey(LoanProduct, on_delete=models.PROTECT, related_name='applications')
    amount_requested = models.DecimalField(max_digits=12, decimal_places=2)
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2)
    years_in_business = models.PositiveIntegerField(default=0)
    purpose = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    decision_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} -> {self.loan_product.name}"


class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlist_items')
    loan_product = models.ForeignKey(LoanProduct, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'loan_product')

    def __str__(self):
        return f"{self.user.email} wishlists {self.loan_product.name}"
    