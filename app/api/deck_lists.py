from flask import Blueprint, request
from app.models import DeckList, Deck, db
from app.forms import NewDeckListForm, EditDeckListForm
from .auth_routes import validation_errors_to_error_messages
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)


deck_list_routes = Blueprint('decklists', __name__)


@deck_list_routes.route('/<int:id>/')
def get_full_deck_list_detail(id):
    decklist = DeckList.query.get(int(id))
    return decklist.to_dict()


@deck_list_routes.route('/cards/<int:id>/')
def get_all_cards_from_list(id):
    decklist = DeckList.query.get(int(id))
    return {'cards': decklist.get_cards()}


@deck_list_routes.route('/', methods=["POST"])
def create_deck_list():
    form = NewDeckListForm()
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
        newDeckList = DeckList(
            title=form.data['title'], cover_photo_url=url, user_id=form.data['user_id'], has_image=form.data['has_image'])
        db.session.add(newDeckList)
        db.session.commit()
        return newDeckList.simple_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@deck_list_routes.route('/<int:id>/',  methods=["PUT"])
def edit_deck_list(id):
    form = EditDeckListForm()
    deckListToEdit = DeckList.query.get(int(id))
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
        deckListToEdit.title = form.data['title']
        if form.data['edit_image'] or form.data['add_image']:
            deckListToEdit.cover_photo_url = url
        if form.data['edit_image'] or form.data['add_image']:
            deckListToEdit.has_image = True
        db.session.commit()
        return deckListToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@deck_list_routes.route('/<int:id>/add/<int:deck_id>/', methods=["PUT"])
def add_deck_to_list(id, deck_id):
    deckList = DeckList.query.get(int(id))
    deck = Deck.query.get(int(deck_id))
    if deck:
        response = deckList.add_deck(deck)
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not find deck {deck_id} to add to list"]}, 500


@deck_list_routes.route('/<int:id>/remove/<int:deck_id>/', methods=["PUT"])
def remove_deck_from_list(id, deck_id):
    deckList = DeckList.query.get(int(id))
    deck = Deck.query.get(int(deck_id))
    if deck:
        response = deckList.remove_deck(deck)
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not find deck {deck_id} to remove from list"]}, 500


@deck_list_routes.route('/<int:id>/',  methods=["DELETE"])
def delete_list(id):
    listToDelte = DeckList.query.get(int(id))
    if listToDelte:
        db.session.delete(listToDelte)
        db.session.commit()
        return {'message': f"List {id} sucessfully deleted."}
    else:
        return {'errors': [f"Could not find list {id} to delete from database"]}, 500
