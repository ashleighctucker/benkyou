from flask import Blueprint, request
from app.models import User, Deck, Badge, db
from app.forms import EditProfileForm
from .auth_routes import validation_errors_to_error_messages
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


def award_badges(user):
    length = len(user.completed_dict)
    if length == 1:
        badge = Badge.query.get(1)
        badge.add_user_badge(user)
    elif length == 3:
        badge = Badge.query.get(2)
        badge.add_user_badge(user)
    elif length == 5:
        badge = Badge.query.get(3)
        badge.add_user_badge(user)
    elif length == 7:
        badge = Badge.query.get(4)
        badge.add_user_badge(user)
    elif length == 10:
        badge = Badge.query.get(5)
        badge.add_user_badge(user)


@user_routes.route('/<int:id>/', methods=["PUT"])
def edit_profile(id):
    userToEdit = User.query.get(int(id))
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    url = 'No Photo'

    if form.data['edit_image'] or form.data['add_image']:
        if "profile_picture" not in form.data:
            return {"errors": "image required"}, 400

        image = form.data["profile_picture"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    if form.validate_on_submit():
        userToEdit.user_name = form.data['user_name']
        userToEdit.email = form.data['email']
        userToEdit.first_name = form.data['first_name']
        if form.data['edit_image'] or form.data['add_image']:
            userToEdit.profile_picture = url
            userToEdit.has_image = True
        db.session.commit()
        return userToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@user_routes.route('/<int:id>/decks/')
def get_my_decks(id):
    user = User.query.get(int(id))
    return {'decks': user.decks_list}


@user_routes.route('/<int:id>/decklists/')
def get_my_decklists(id):
    user = User.query.get(int(id))
    return {'decklists': user.lists_list}


@user_routes.route('/<int:id>/decks/<int:deckId>/add/', methods=["PUT"])
def complete_deck(id, deckId):
    deck = Deck.query.get(int(deckId))
    user = User.query.get(int(id))
    if user and deck:
        response = deck.add_completed_user(user)
        if 'errors' in response:
            return response, 400
        award_badges(user)
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not add user {id} to complete deck"]}, 500


@user_routes.route('/<int:id>/decks/<int:deckId>/remove/', methods=["PUT"])
def remove_complete_deck(id, deckId):
    deck = Deck.query.get(int(deckId))
    user = User.query.get(int(id))
    if user and deck:
        response = deck.remove_completed_user(user)
        if 'errors' in response:
            return response, 400
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not add user {id} to completed deck"]}, 500


@user_routes.route('/<int:id>/info/')
def get_user_info(id):
    user = User.query.get(int(id))
    return user.to_dict()
