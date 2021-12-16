from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Deck, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/decks/')
def get_my_decks(id):
    decks = db.session.query(Deck).filter(Deck.user_id == id).all()
    return {'decks': [deck.to_dict() for deck in decks]}


@user_routes.route('/<int:id>/decks/<int:deckId>/add/', methods=["PUT"])
def master_deck(id, deckId):
    deck = Deck.query.get(int(deckId))
    user = User.query.get(int(id))
    if user and deck:
        response = deck.add_mastered_user(user)
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not add user {id} to mastered deck"]}, 500


@user_routes.route('/<int:id>/decks/<int:deckId>/remove/', methods=["PUT"])
def remove_mastered_deck(id, deckId):
    deck = Deck.query.get(int(deckId))
    user = User.query.get(int(id))
    if user and deck:
        response = deck.remove_mastered_deck(user)
        db.session.commit()
        return response
    else:
        return {'errors': [f"Could not add user {id} to mastered deck"]}, 500

