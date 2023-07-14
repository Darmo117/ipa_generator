from django.urls import path

from . import views

app_name = 'application'
urlpatterns = [
    path('', views.index),
    path('to-ipa/', views.to_ipa__get, name='to-ipa'),
    path('from-ipa/', views.from_ipa__get, name='from-ipa'),
]
