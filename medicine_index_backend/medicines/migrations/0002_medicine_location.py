# Generated by Django 4.2.13 on 2024-06-06 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicines', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicine',
            name='location',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]