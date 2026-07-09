from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import LoanProduct, LoanApplication, Wishlist
from .serializers import LoanProductSerializer, LoanApplicationSerializer, WishlistSerializer


class LoanProductListView(generics.ListAPIView):
    queryset = LoanProduct.objects.filter(is_active=True)
    serializer_class = LoanProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'requires_collateral']
    search_fields = ['name', 'description']


class LoanProductDetailView(generics.RetrieveAPIView):
    queryset = LoanProduct.objects.filter(is_active=True)
    serializer_class = LoanProductSerializer
    permission_classes = [permissions.AllowAny]


class LoanApplyView(generics.CreateAPIView):
    serializer_class = LoanApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]


class MyApplicationsView(generics.ListAPIView):
    serializer_class = LoanApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return LoanApplication.objects.filter(user=self.request.user).order_by('-created_at')


class WishlistView(generics.ListCreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)


class WishlistDeleteView(generics.DestroyAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)
