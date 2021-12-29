from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Deck


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Field must be between 1-256 characters')


class NewDeckForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = FileField('cover photo')
    category_id = IntegerField('category id', validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
    has_image = BooleanField('has image')


class EditDeckForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = FileField('cover photo')
    category_id = IntegerField('category id', validators=[DataRequired()])
    has_image = BooleanField('has image')
    edit_image = BooleanField('edit image')
    add_image = BooleanField('add image')
