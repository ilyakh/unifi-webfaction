from django.conf.urls import patterns, include, url
from django.contrib import admin
from login.views import Gateway

admin.autodiscover()

urlpatterns = patterns('',

    # admin
    # url(r'^admin/doc/',           include('django.contrib.admindocs.urls')),
    url( r'^admin/',                include(admin.site.urls)),

    # rest_framework
    url(
        r'^restframework/',
        include( 'rest_framework.urls',
           namespace='rest_framework'
        )
    ),

    # root application
    ## main page
    url(
        r'^$',
        Gateway()
    ),

    # inclusive applications
    # url( r'^communication/',       include('communication.urls')),

    url( r'^login/',               include('login.urls')),

    url(
        r'^person/',
        include('person.urls'),
        name="person"
    ),
    url(
        r'^tag/',
        include('tag.urls'),
        name="tag"
    ),

    url(
        r'^match/',
        include('match.urls'),
        name="match"
    ),
    url(
        r'^group/',
        include('group.urls'),
        name="group"
    ),
    url(
        r'^my/',
        include('my.urls'),
        name="my"
    ),
)
