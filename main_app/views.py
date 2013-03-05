from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden, HttpResponseServerError
from django.template import Context, RequestContext
from django.template.loader import get_template
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.core.context_processors import csrf
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.utils import simplejson
import random, string
import id_generator
from datetime import datetime
from models import *


def main_page(request):
	rndmurl = id_generator.random_id(8)
	while True:
		try:
			list = List.objects.get(id=rndmurl)
		except:
			rndmurl = id_generator.random_id(8)
			break
	url = "/"+rndmurl
	return HttpResponseRedirect(url)

def list(request, listid):
	try:
		list = List.objects.get(id=listid)
	except:
		list = List(id=listid, last_modified=datetime.now())
		list.save()
	template = get_template("index.html")
	context = RequestContext(request, {"list":list, "all":all})
	return HttpResponse(template.render(context))
	
def list_post(request, listid):
	if request.POST:
		data = request.POST
		title = data["title"]
		input = data["input"]
		list = get_object_or_404(List, id=listid)
		if not list.locked:
			list.title = title
			list.content = input
			list.last_modified = datetime.now()
			list.save()
			return HttpResponse()
		else:
			return HttpResponse()

def list_lock(request, listid):
	list = get_object_or_404(List, id=listid)
	list.locked = True
	list.save()
	return HttpResponseRedirect("/"+listid)
