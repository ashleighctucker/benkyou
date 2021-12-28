from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError(
            'Email address in use.')


def username_exists(form, field):
    # Checking if username is already in use
    user_name = field.data
    user = User.query.filter(User.user_name == user_name).first()
    if user:
        raise ValidationError('Username not available.')


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 150) or (len(field) < 1):
            raise ValidationError(
                'First Name field must be 1-150 characters')


def check_email(form, field):
    if field.data:
        field = field.data
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Email field mist be 1-256 characters')


def check_user_name(form, field):
    if field.data:
        field = field.data
    if (len(field) > 40) or (len(field) < 5):
        raise ValidationError('User Name field must be 5-40 characters.')


class SignUpForm(FlaskForm):
    user_name = StringField(
        'username', validators=[DataRequired(), username_exists, check_user_name])
    email = StringField('email', validators=[DataRequired(), Regexp(
        "^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", flags=0, message="Please enter a valid email address"), check_email,  user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first name', validators=[
                             DataRequired(), check_length])
