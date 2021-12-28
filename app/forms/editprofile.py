from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    user_name = field.data
    user = User.query.filter(User.user_name == user_name).first()
    if user.id != form.data['user_id']:
        raise ValidationError('Username not available.')


def check_user_name(form, field):
    if field.data:
        field = field.data
    if (len(field) > 40) or (len(field) < 1):
        raise ValidationError('Field must be between 1-40 characters')


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 150) or (len(field) < 1):
            raise ValidationError('Field must be between 1-150 characters')


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user.id != form.data['user_id']:
        raise ValidationError(
            'Email address alredy assocaited with an account.')


class EditProfileForm(FlaskForm):
    user_name = StringField(
        'username', validators=[DataRequired(), username_exists, check_user_name])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first name', validators=[
                             DataRequired(), check_length])
    user_id = IntegerField('user id', validators=[DataRequired()])
    add_image = BooleanField('add image')
    profile_picture = StringField('profile pic')
