from .db import db
from datetime import datetime


class MasteredDeck(db.Model):
    __tablename__ = 'mastered_decks'

    deck_id = db.Column(db.Integer, db.ForeignKey(
        'decks.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)


class AddedDeck(db.Model):
    __tablename__ = 'added_decks'
    deck_id = db.Column(db.Integer, db.ForeignKey(
        'decks.id'), primary_key=True)
    deck_list_id = db.Column(db.Integer, db.ForeignKey(
        'deck_lists.id'), primary_key=True)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
