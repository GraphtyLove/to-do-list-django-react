""" File to define to which models the admin panel can access to."""
from django.contrib import admin
from .models import Task

# Register your models here.
admin.site.register(Task)