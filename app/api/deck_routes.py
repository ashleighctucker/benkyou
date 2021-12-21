from flask import Blueprint, request
from app.models import Deck, db
from app.forms import NewDeckForm, EditDeckForm
from .auth_routes import validation_errors_to_error_messages
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/<int:id>/')
def get_full_deck_detail(id):
    deck = Deck.query.get(int(id))
    return deck.to_dict()


@deck_routes.route('/', methods=["POST"])
def create_deck():
    form = NewDeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    url = 'No Photo'
    if form.data['has_image']:
        if "cover_photo_url" not in form.data:
            return {"errors": "image required"}, 400

        image = form.data["cover_photo_url"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]

    if form.validate_on_submit():
        newDeck = Deck(title=form.data['title'], cover_photo_url=url,
                       category_id=form.data['category_id'], user_id=form.data['user_id'], has_image=form.data['has_image'])
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
    url = 'No Photo'

    if form.data['edit_image'] or form.data['add_image']:
        if "cover_photo_url" not in form.data:
            return {"errors": "image required"}, 400

        image = form.data["cover_photo_url"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    if form.validate_on_submit():
        deckToEdit.title = form.data['title']
        if form.data['edit_image'] or form.data['add_image']:
            deckToEdit.cover_photo_url = url
        deckToEdit.category_id = form.data['category_id']
        if form.data['edit_image'] or form.data['add_image']:
            deckToEdit.has_image = True
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
