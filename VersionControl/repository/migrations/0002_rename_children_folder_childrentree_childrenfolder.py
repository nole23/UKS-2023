# Generated by Django 5.0.1 on 2024-02-04 22:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='childrentree',
            old_name='children_folder',
            new_name='childrenFolder',
        ),
    ]
