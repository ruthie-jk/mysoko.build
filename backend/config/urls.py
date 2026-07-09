from django.contrib import admin
from django.urls import path, include
from accounts.views import ProfileView, ChangePasswordView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/user/profile/', ProfileView.as_view(), name='user-profile'),
    path('api/user/password/', ChangePasswordView.as_view(), name='user-password'),
    path('api/loans/', include('loans.urls')),
]
