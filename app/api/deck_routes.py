from flask import Blueprint, request
from app.models import Deck, db
from app.forms import NewDeckForm, EditDeckForm
from .auth_routes import validation_errors_to_error_messages

deck_routes = Blueprint('dekcs', __name__)


@deck_routes.route('/', methods=["POST"])
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


@deck_routes.route('/<int:id>/', methods=["PUT"])
def edit_deck(id):
    form = EditDeckForm()
    deckToEdit = Deck.query.get(int(id))
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deckToEdit.title = form.data['title']
        deckToEdit.cover_photo_url = form.data['cover_photo_url']
        deckToEdit.category_id = form.data['category_id']
        db.session.commit()
        return deckToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@deck_routes.route('/<int:id>/', methods=["DELETE"])
def delete_deck(id):
    deckToDelete = Deck.query.get(int(id))
    if deckToDelete:
        db.session.delete(deckToDelete)
        db.session.commit()
        return {'message': f"Deck {id} sucessfully deleted."}
    else:
        return {'errors': [f"Could not find deck {id} to delete from database"]}, 500
