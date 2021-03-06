from flask import Blueprint, request
from app.models import Card, db
from app.forms import NewCardForm, EditCardForm, DeckSwitchForm
from .auth_routes import validation_errors_to_error_messages
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

card_routes = Blueprint('cards', __name__)


@card_routes.route('/', methods=["POST"])
def create_card():
    form = NewCardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    url = 'No Photo'
    if form.data['has_image']:
        if "image_url" not in form.data:
            return {"errors": "image required"}, 400

        image = form.data["image_url"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]

    if form.validate_on_submit():
        newCard = Card(
            title=form.data['title'], pronunciation=form.data['pronunciation'], type=form.data['type'], definition=form.data['definition'], example=form.data['example'], image_url=url, emoji=form.data['emoji'], deck_id=form.data['deck_id'], user_id=form.data['user_id'], has_image=form.data['has_image'])
        db.session.add(newCard)
        db.session.commit()
        return newCard.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@card_routes.route('/<int:id>/', methods=["PUT"])
def edit_card(id):
    form = EditCardForm()
    cardToEdit = Card.query.get(int(id))
    form['csrf_token'].data = request.cookies['csrf_token']
    url = 'No Photo'

    if form.data['edit_image'] or form.data['add_image']:
        if "image_url" not in form.data:
            return {"errors": "image required"}, 400

        image = form.data["image_url"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    if form.validate_on_submit():
        cardToEdit.title = form.data['title']
        cardToEdit.pronunciation = form.data['pronunciation']
        cardToEdit.type = form.data['type']
        cardToEdit.definition = form.data['definition']
        cardToEdit.example = form.data['example']
        if form.data['edit_image'] or form.data['add_image']:
            cardToEdit.image_url = url
        if form.data['edit_image'] or form.data['add_image']:
            cardToEdit.has_image = True
        cardToEdit.emoji = form.data['emoji']
        db.session.commit()
        return cardToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@card_routes.route('/move/<int:id>/', methods=["PUT"])
def switch_decks(id):
    form = DeckSwitchForm()
    cardToMove = Card.query.get(int(id))
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cardToMove.deck_id = form.data['deck_id']
        db.session.commit()
        return cardToMove.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@card_routes.route('/<int:id>/', methods=["DELETE"])
def delete_card(id):
    cardtoDelete = Card.query.get(int(id))
    if cardtoDelete:
        db.session.delete(cardtoDelete)
        db.session.commit()
        return {'message': f"Card {id} sucessfully deleted."}
    else:
        return {'errors': [f"Could not find card {id} to delete from database"]}, 500
