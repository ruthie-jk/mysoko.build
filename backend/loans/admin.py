from django.contrib import admin
from .models import LoanProduct, LoanApplication, Wishlist

admin.site.register(LoanProduct)
admin.site.register(LoanApplication)
admin.site.register(Wishlist)
