# Generated by Django 4.2.8 on 2023-12-06 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_user_organization_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='organization_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
