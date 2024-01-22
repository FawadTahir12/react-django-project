
import requests
from typing import Dict, Any
from django.conf import settings
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail

from django.conf import settings
from django.template.loader import render_to_string
from .models import CustomUser
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
load_dotenv()


GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'



def generate_tokens_for_user(user):
    """
    Generate access and refresh tokens for the given user
    """
    serializer = TokenObtainPairSerializer()
    token_data = serializer.get_token(user)
    access_token = token_data.access_token
    refresh_token = token_data
    return access_token, refresh_token


def google_get_access_token(*, code: str, redirect_uri: str) -> str:
    data = {
        'code': code,
        'client_id': settings.GOOGLE_OAUTH2_CLIENT_ID,
        'client_secret': settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }


    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)

    if not response.ok:
        raise ValidationError('Failed to obtain access token from Google.')

    access_token = response.json()['access_token']
    return access_token


def google_get_user_info(*, access_token:  str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )                   

    if not response.ok:
        raise ValidationError('Failed to obtain user info from Google.')

    return response.json()



def get_first_matching_attr(obj, *attrs, default=None):
    for attr in attrs:
        if hasattr(obj, attr):
            return getattr(obj, attr)

    return default


def get_error_message(exc) -> str:
    if hasattr(exc, 'message_dict'):
        return exc.message_dict
    error_msg = get_first_matching_attr(exc, 'message', 'messages')

    if isinstance(error_msg, list):
        error_msg = ', '.join(error_msg)

    if error_msg is None:
        error_msg = str(exc)

    return error_msg




def send_otp_email(email):

    subject = "Reset Password"
    message = ''
    email_from = os.environ['EMAIL_HOST_USER']
    context = {
    'subject': subject,
    'greeting': 'Hey, From ECOM App',
    'message': 'Your Reset Password Link is given. Below Please to set your password click the link below',
}
    html_message = render_to_string('authentication/email.html', context)
    # Send the email
    try:
        send_mail(subject, message, email_from, [email], html_message=html_message)
    except Exception as e:
        print('Error sending email:', str(e))
        return None