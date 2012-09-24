from django.conf.urls import patterns, include, url
from my import views

urlpatterns = patterns( '',

    # a personal front page belonging to each user's account
    url( r'^$', views.MyView() ),

    # handlebars.js and RESTful-integration
    url( r'^handlebars$', views.Handlebars() ),

    url( r'^wish/', views.WishView() ),

)
