""" File to define all the routes of the API. """
from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('task-list/', views.task_list, name='task-list'),
    path('task-details/<str:pk>/', views.task_details, name='task-details'),
    path('task-create/', views.task_create, name='task-create'),
    path('task-update/<str:pk>/', views.task_update, name='task-update'),
    path('task-delete/<str:pk>/', views.task_delete, name='task-delete'),
]