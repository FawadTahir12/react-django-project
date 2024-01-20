from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
from .models import CustomUser
from rest_framework.validators import UniqueValidator
from rest_framework.views import exception_handler

    
class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'full_name', 'password', 'id', 'verified_status']
        extra_kwargs = {'password': {'write_only': True},
                        "email": {
                            "validators": [],
                        },
                        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model.objects.create(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    


class VerifyAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
    
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh)   # comment out if you don't want this
        data["access"] = str(refresh.access_token)
        data["email"] = self.user.email
        data["id"] = self.user.id
        data["full_name"] = self.user.full_name
        return data