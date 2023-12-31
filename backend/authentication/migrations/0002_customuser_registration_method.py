# Generated by Django 4.2 on 2023-12-28 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='registration_method',
            field=models.CharField(choices=[('email', 'Email'), ('google', 'Google')], default='email', max_length=10),
        ),
    ]