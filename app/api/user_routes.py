from re import U
from flask import Blueprint, jsonify
from flask_login import login_required
from sqlalchemy.sql.functions import user
from app.models import User, Deck, DeckList, Badge, db

user_routes = Blueprint('users', __name__)


def award_badges(user):
    length = len(user.completed_dict)
    print(length)
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
