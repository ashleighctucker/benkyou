from flask import Blueprint, request
from app.models import Deck, db
from app.forms import NewDeckForm
from .auth_routes import validation_errors_to_error_messages

deck_routes = Blueprint('dekcs', __name__)


@deck_routes.route('/')
def create_deck():
    form = NewDeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newDeck = Deck(title=form.data['title'], cover_photo_url=form.data['cover_photo_url'],
                       category_id=form.data['category_id'], user_id=form.data['user_id'])
        db.session.add(newDeck)
        db.session.commit()
        return newDeck.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
