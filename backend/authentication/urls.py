from django.urls import path
from .views import CustomUserCreate
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from .views import CustomTokenObtainPairView
urlpatterns = [
    path('register/', CustomUserCreate.as_view()),
    # path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]