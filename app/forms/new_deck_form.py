from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Deck


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Field must be between 1-256 characters')


class NewDeckForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = StringField(
        'cover photo', validators=[check_length, URL(
            require_tld=True, message="Please enter a valid url for the cover photo")])
    category_id = IntegerField('category id', validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
