from flask import Blueprint, request
from app.models import Card, db
from app.forms import NewCardForm
from .auth_routes import validation_errors_to_error_messages

card_routes = Blueprint('cards', __name__)


@card_routes.route('/', methods=["POST"])
def create_card():
    form = NewCardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newCard = Card(
            title=form.data['title'], pronunciation=form.data['pronunciation'], type=form.data['type'], definition=form.data['definition'], example=form.data['example'], image_url=form.data['image_url'], emoji=form.data['emoji'], deck_id=form.data['deck_id'], user_id=form.data['user_id'])
        db.session.add(newCard)
        db.session.commit()
        return newCard.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
