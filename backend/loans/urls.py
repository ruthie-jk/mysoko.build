from django.urls import path
from .views import (
    LoanProductListView, LoanProductDetailView,
    LoanApplyView, MyApplicationsView,
    WishlistView, WishlistDeleteView,
)

urlpatterns = [
    path('', LoanProductListView.as_view(), name='loan-list'),
    path('<int:pk>/', LoanProductDetailView.as_view(), name='loan-detail'),
    path('apply/', LoanApplyView.as_view(), name='loan-apply'),
    path('my-applications/', MyApplicationsView.as_view(), name='my-applications'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('wishlist/<int:pk>/', WishlistDeleteView.as_view(), name='wishlist-delete'),
]