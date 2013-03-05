from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

from datetime import *

ID_FIELD_LENGTH = 8

class List(models.Model):
	id = models.CharField(max_length=ID_FIELD_LENGTH, primary_key=True)
	last_modified = models.DateTimeField(default=None, blank=True, null=True)
	title = models.CharField(max_length=30, default= None, blank=True, null=True)
	content = models.TextField(default=None, blank=True, null=True)
	locked = models.BooleanField(default=False, blank = True)