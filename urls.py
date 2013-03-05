from django.conf.urls.defaults import patterns, include, url
from main_app.views import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', main_page),
	url(r'^(\w{8})$', list),
	url(r'^(\w{8})/post/?$', list_post),
	url(r'^(\w{8})/lock/?$', list_lock),
	# Examples:
	# url(r'^$', 'lista.views.home', name='home'),
	# url(r'^lista/', include('lista.foo.urls')),

	# Uncomment the admin/doc line below to enable admin documentation:
	# url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

	# Uncomment the next line to enable the admin:
	# url(r'^admin/', include(admin.site.urls)),
)
