from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterUserSerializer, VerifyAccountSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CustomUser

# Create your views here.
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        confirm_password = request.data['confirmPassword']
        if password != confirm_password:
            return  Response({
                    "error": "Password and confirm password does not match."
                }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        req_serializer = RegisterUserSerializer(data=request.data)
        if req_serializer.is_valid():
            if CustomUser.objects.filter(email=email).exists():
                return Response({
                    "error": "Email Already exists"
                }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

            req_serializer.save()
            # otp, secret, valid_date = send_otp_email(req_serializer.data['email'])

            # if otp:
            #     print(otp, secret, valid_date)
            #     return Response({
            #         "email": email,
            #         "secret": secret,
            #         "valid_date": valid_date
            #     })

            # otp_via_mail(req_serializer.data['email'])  this is random otp genrated funtion
            return Response(data=req_serializer.data, status=status.HTTP_201_CREATED)

        else:
            if 'email' in req_serializer.errors or 'password' in req_serializer.errors:
                return Response({"error": "Email or password is required"}
                                , status=status.HTTP_403_FORBIDDEN)
            return Response(req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Check if email and password are present in the request data
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            # If either email or password is missing, return a custom response
            return Response(
                {'error': 'Email or Password is required'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Call the parent class's post method to generate the token
        response = super().post(request, *args, **kwargs)

        return response


# class VerifyAccount(APIView): # This function verify otp when otp saved in databse
#     def post(self, request):
#         try:
#             serializer = VerifyAccountSerializer(data=request.data)
#             if serializer.is_valid():
#                 email = serializer.data['email']
#                 otp = serializer.data['otp']
#                 user = CustomUser.objects.filter(email=email)
#                 if not user.exists():
#                     return Response(data={
#                         'status': 400,
#                         'message': 'something went wrong',
#                         'data': 'invalid email'

#                     })
#                 if not user[0].otp_digit == otp:
#                     return Response(data={
#                         'status': 400,
#                         'message': 'something went wrong',
#                         'data': 'invalid otp'

#                     })
#                 user = user.first()
#                 user.verified_status = True
#                 user.is_active = True
#                 user.save()
#                 return Response(data={
#                     'status': 200,
#                     'message': 'User Verified SuccessFully',
#                     'data': serializer.data

#                 })
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         except Exception as e:
#             return Response(str(e))


# class GetData(APIView):
#     # authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         users_name = [{"name": "fawad", "course": "Django"}]
#         return Response(users_name)


# from django.shortcuts import get_object_or_404
# import pyotp


# class OTPVerifyView(APIView): # No need to save Otp in database
#     def post(self, request, format=None):
#         email = request.data.get('email')
#         otp = request.data.get('otp')
#         secret = request.data.get('secret')
#         valid_date = request.data.get('valid_date')

#         try:
#             user = get_object_or_404(CustomUser, email=email)  # Replace with your user model
#         except user.DoesNotExist:
#             return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

#         if secret and valid_date is not None:
#             valid_dat = datetime.fromisoformat(valid_date)
#             if valid_dat > datetime.now():
#                 totp = pyotp.TOTP(secret, interval=300)
#                 if totp.verify(otp):
#                     print("Verify")
#                     user.verified_status = True
#                     user.is_active = True
#                     user.save()
#                     return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)
#                 else:
#                     return Response({'message':'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 return Response({'error': 'OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({'error': 'something went Wrong'}, status=status.HTTP_400_BAD_REQUEST)