from django.urls import path
from .views import CustomUserCreate
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .googleLoginview import GoogleLoginApi
# from .views import CustomTokenObtainPairView
urlpatterns = [
    path('register/', CustomUserCreate.as_view()),
    path('auth/login/google/', GoogleLoginApi.as_view(),  name="login-with-google"),
    # path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]