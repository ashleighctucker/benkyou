from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(150), nullable=False)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)

    decks = db.relationship(
        'Deck', back_populates='creator', cascade="all, delete-orphan")
    cards = db.relationship(
        'Card', back_populates='creator', cascade="all, delete-orphan")
    deck_lists = db.relationship(
        'DeckList', back_populates='creator',  cascade="all, delete-orphan")
    mastered_decks = db.relationship(
        'Deck', secondary="mastered_decks", back_populates='mastered_users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def simple_dict(self):
        return {
            'id': self.id,
            'username': self.user_name,
            'email': self.email,
            'first_name': self.first_name,
            'created_on': self.created_on,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.user_name,
            'email': self.email,
            'first_name': self.first_name,
            'created_on': self.created_on,
            'mastered_decks': [{'deck_id': obj.deck_id, 'created_on': obj.created_on} for obj in self.mastered_decks]
        }
