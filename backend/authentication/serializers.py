from rest_framework import serializers
from django.conf import settings
from .models import CustomUser
from rest_framework.validators import UniqueValidator

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