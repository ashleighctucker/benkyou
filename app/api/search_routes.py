from flask import Blueprint, request
from sqlalchemy.sql.elements import or_
from app.models import Deck, User, Category, db

search_routes = Blueprint('search', __name__)


def search_decks(term):
    decksByTitle = db.session.query(Deck).filter(
        Deck.title.ilike(f"%{term}%")).all()
    searchSet = set(decksByTitle)

    users = db.session.query(User).filter(
        or_(User.user_name.ilike(f"%{term}%"), User.first_name.ilike(f"%{term}%"))).all()
    for user in users:
        decks = db.session.query(Deck).filter(Deck.user_id == user.id).all()
        for i in decks:
            searchSet.add(i)

    category = db.session.query(Category).filter(
        Category.title.ilike(f"%{term}%")).first()
    if category:
        decksByCategory = db.session.query(Deck).filter(
            Deck.category_id == category.id).all()
        for i in decksByCategory:
            searchSet.add(i)
    return list(searchSet)


@search_routes.route('/<term>/')
def search(term):
    searchResults = search_decks(term)
    if len(searchResults) > 0:
        return {'search': [deck.to_dict() for deck in searchResults]}
    else:
        return {'message': f"No results for {term}."}
