from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Deck


def check_length(form, field):
    field = field.data
    if field.data:
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Field must be between 1-256 characters')


class NewDeckForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = StringField('cover photo', validators=[check_length])
    category_id = IntegerField('category id', validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
