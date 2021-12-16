from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import DeckList


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Field must be between 1-256 characters')


class NewDeckListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = StringField(
        'cover photo', validators=[check_length, URL(
            require_tld=True, message="Please enter a valid url for the cover photo")])
    user_id = IntegerField('user id', validators=[DataRequired()])


