from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Card, db


def check_length(form, field):
    if field.data:
        field = field.data
        if (len(field) > 256) or (len(field) < 1):
            raise ValidationError('Field must be between 1-256 characters')


def check_emoji(form, field):
    if field.data:
        field = field.data
        if (len(field) > 3) or (len(field) < 1):
            raise ValidationError('Emoji must be between 1-3 characters')


def switch_validation(form, field):
    deck_id = field.data
    card = db.session.query(Card).filter(
        Card.deck_id == form.data['card_id']).first()
    if card.deck_id == deck_id:
        raise ValidationError(f"Already in deck {deck_id}")


class NewCardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    pronunciation = StringField('pronunciation', validators=[check_length])
    type = StringField('type', validators=[check_length])
    definition = TextAreaField('definition', validators=[DataRequired()])
    example = TextAreaField('example')
    image_url = StringField(
        'image url', validators=[check_length])
    emoji = StringField('emoji', validators=[check_emoji])
    deck_id = IntegerField('deck id', validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])


class EditCardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), check_length])
    pronunciation = StringField('pronunciation', validators=[check_length])
    type = StringField('type', validators=[check_length])
    definition = TextAreaField('definition', validators=[DataRequired()])
    example = TextAreaField('example')
    image_url = StringField(
        'image url', validators=[check_length])
    emoji = StringField('emoji', validators=[check_emoji])


class DeckSwitchForm(FlaskForm):
    deck_id = IntegerField('deck id', validators=[DataRequired()])
    card_id = IntegerField('card id', validators=[DataRequired()])
