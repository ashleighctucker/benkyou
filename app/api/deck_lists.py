from flask import Blueprint, request
from app.models import DeckList, Deck, db
from app.forms import NewDeckListForm
from .auth_routes import validation_errors_to_error_messages

deck_list_routes = Blueprint('decklists', __name__)


@deck_list_routes.route('/')
def test():
    return {'message': 'test'}


@deck_list_routes.route('/', methods=["POST"])
def create_deck_list():
    form = NewDeckListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newDeckList = DeckList(
            title=form.data['title'], cover_photo_url=form.data['cover_photo_url'], user_id=form.data['user_id'])
        db.session.add(newDeckList)
        db.session.commit()
        return newDeckList.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@deck_list_routes.route('/<int:id>/add/<int:deck_id>/', methods=["PUT"])
def add_deck_to_list(id, deck_id):
    deckList = DeckList.query.get(int(id))
    deck = Deck.query.get(int(id))
    response = deckList.add_deck(deck)
    db.session.commit()
    return response


@deck_list_routes.route('/<int:id>/remove/<int:deck_id>/', methods=["PUT"])
def remove_deck_from_list(id, deck_id):
    deckList = DeckList.query.get(int(id))
    deck = Deck.query.get(int(id))
    response = deckList.remove_deck(deck)
    db.session.commit()
    return response

