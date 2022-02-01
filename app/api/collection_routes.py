from flask import Blueprint, request
from app.models import Collection, Deck, db
from app.forms import NewCollectionForm, EditCollectionForm
from .auth_routes import validation_errors_to_error_messages
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)


collection_routes = Blueprint('collections', __name__)


@collection_routes.route('/<int:id>/')
def get_full_deck_list_detail(id):
    collection = Collection.query.get(int(id))
    return collection.to_dict()


@collection_routes.route('/cards/<int:id>/')
def get_all_cards_from_list(id):
    collection = Collection.query.get(int(id))
    return {'cards': collection.get_cards()}


@collection_routes.route('/', methods=["POST"])
def create_deck_list():
    form = NewCollectionForm()
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
        newCollection = Collection(
            title=form.data['title'], cover_photo_url=url, user_id=form.data['user_id'], has_image=form.data['has_image'])
        db.session.add(newCollection)
        db.session.commit()
        return newCollection.simple_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@collection_routes.route('/<int:id>/',  methods=["PUT"])
def edit_deck_list(id):
    form = EditCollectionForm()
    collectionToEdit = Collection.query.get(int(id))
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
        collectionToEdit.title = form.data['title']
        if form.data['edit_image'] or form.data['add_image']:
            collectionToEdit.cover_photo_url = url
        if form.data['edit_image'] or form.data['add_image']:
            collectionToEdit.has_image = True
        db.session.commit()
        return collectionToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@collection_routes.route('/<int:id>/add/<int:deck_id>/', methods=["PATCH"])
def add_deck_to_list(id, deck_id):
    collection = Collection.query.get(int(id))
    deck = Deck.query.get(int(deck_id))
    if deck:
        response = collection.add_deck(deck)
        if 'errors' in response:
            return response, 400
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not find deck {deck_id} to add to the collection"]}, 500


@collection_routes.route('/<int:id>/remove/<int:deck_id>/', methods=["PATCH"])
def remove_deck_from_list(id, deck_id):
    collection = Collection.query.get(int(id))
    deck = Deck.query.get(int(deck_id))
    if deck:
        response = collection.remove_deck(deck)
        if 'errors' in response:
            return response, 400
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not find deck {deck_id} to remove from the collection"]}, 500


@collection_routes.route('/<int:id>/',  methods=["DELETE"])
def delete_list(id):
    collectionToDelete = Collection.query.get(int(id))
    if collectionToDelete:
        db.session.delete(collectionToDelete)
        db.session.commit()
        return {'message': f"Collection {id} sucessfully deleted."}
    else:
        return {'errors': [f"Could not find collection {id} to delete from the database"]}, 500
