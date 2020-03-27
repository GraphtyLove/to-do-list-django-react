# from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task


# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    """Define routes of the API. This page return a doc page with all the routes."""
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    
    return Response(api_urls)


@api_view(['GET'])
def task_list(request):
    # Query the DB
    tasks = Task.objects.all().order_by("-id")
    # Serialize data
    serializer = TaskSerializer(tasks, many=True)
    # Return the data serialized
    return Response(serializer.data)


@api_view(['GET'])
def task_details(request, pk):
    # Query the DB
    tasks = Task.objects.get(id=pk)
    # Serialize data
    serializer = TaskSerializer(tasks, many=False)
    # Return the data serialized
    return Response(serializer.data)


@api_view(['POST'])
def task_create(request):
    # Format the data to send them to DB
    serializer = TaskSerializer(data=request.data)
    
    # Check if the data are valid
    if serializer.is_valid():
        # Send data to the DB
        serializer.save()
    # Return the data serialized
    return Response(serializer.data)


@api_view(['POST'])
def task_update(request, pk):
    # Get the task from the DB
    task = Task.objects.get(id=pk)
    # Format the data to send them to DB and assign it to the entry get by task
    serializer = TaskSerializer(instance=task, data=request.data)
    # Check if the data are valid
    if serializer.is_valid():
        # Send data to the DB
        serializer.save()
    # Return the data serialized
    return Response(serializer.data)


@api_view(['DELETE'])
def task_delete(request, pk):
    # Get the task from the DB
    task = Task.objects.get(id=pk)
    # Delete the entry in the DB
    task.delete()
    # Return the data serialized
    return Response("Item successfully deleted!")