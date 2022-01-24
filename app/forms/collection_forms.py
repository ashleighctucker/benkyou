from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,  BooleanField
from wtforms.validators import DataRequired, ValidationError


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Field must be between 1-256 characters')


class NewCollectionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = StringField('cover photo')
    user_id = IntegerField('user id', validators=[DataRequired()])
    has_image = BooleanField('has image')


class EditCollectionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    cover_photo_url = StringField('cover photo')
    has_image = BooleanField('has image')
    edit_image = BooleanField('edit image')
    add_image = BooleanField('add image')
