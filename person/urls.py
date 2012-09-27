#!/usr/bin/env python2.7
# -*- coding: utf8 -*-

from django.conf.urls import patterns, include, url
from djangorestframework import permissions
from djangorestframework.views import InstanceModelView, ListOrCreateModelView
from person import views
from resources import PersonResource, WishResource




urlpatterns = patterns( '',

    url(
        r'^$',
        ListOrCreateModelView.as_view(
            resource=PersonResource,
            permissions=( permissions.IsAuthenticated, )
        )
    ),
    url(
        r'^(?P<pk>[0-9]+)/$',
        InstanceModelView.as_view(
            resource=PersonResource,
            permissions=( permissions.IsAuthenticated, )
        )
    ),

    url(
        r'^[0-9]+/wish/$',
        ListOrCreateModelView.as_view(
            resource=WishResource,
            permissions=( permissions.IsAuthenticated, )
        )
    ),
    url(
        r'^[0-9]+/wish/(?P<pk>[0-9]+)/$',
        InstanceModelView.as_view(
            resource=WishResource,
            permissions=( permissions.IsAuthenticated, )
        )
    ),


    url(
        # wish creation from tagger
        r'^wish/(?P<pk>\d*)$',
        views.SelectWish()
    ),
    url(
        # wish creation from tagger
        r'^wish/create$',
        views.CreateWish()
    ),

)

