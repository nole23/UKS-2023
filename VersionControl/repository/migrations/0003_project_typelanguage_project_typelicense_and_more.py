# Generated by Django 5.0.6 on 2024-05-26 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repository', '0002_rename_children_folder_childrentree_childrenfolder'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='typeLanguage',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='typeLicense',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='typeProject',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
