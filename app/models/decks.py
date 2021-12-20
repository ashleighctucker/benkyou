from .db import db
from datetime import datetime


class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    cover_photo_url = db.Column(db.String(256))
    has_image = db.Column(db.Boolean, default=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        "categories.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)

    category = db.relationship('Category', back_populates='decks')
    creator = db.relationship('User', back_populates='decks')
    cards = db.relationship('Card', back_populates='deck',
                            cascade="all, delete-orphan")
    deck_lists = db.relationship(
        'DeckList', secondary="added_decks", back_populates="decks")
    mastered_users = db.relationship(
        'User', secondary="mastered_decks", back_populates="mastered_decks")

    @property
    def category_type(self):
        return self.category.title

    @property
    def deck_owner(self):
        return self.creator.user_name

    def add_mastered_user(self, user):
        if user not in self.mastered_users:
            self.mastered_users.append(user)
            return self.to_dict()
        else:
            return {'errors': f"Deck {self.id} already in mastered by user {user.id}."}

    def remove_mastered_deck(self, user):
        if user in self.mastered_users:
            self.mastered_users.remove(user)
            return self.to_dict()
        else:
            return {'errors': f"Could not find {user.id} in mastered list"}

    def simple_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category_id': self.category_id,
            'created_on': self.created_on,
        }

    def to_dict(self):
        cat = str(self.category.title)
        owner = str(self.creator.user_name)

        return {
            'id': self.id,
            'title': self.title,
            'has_image': self.has_image,
            'cover_photo_url': self.cover_photo_url,
            'category': cat,
            'category_id': self.category_id,
            'creator': owner,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
            'cards': {obj.id: {'id': obj.id,
                               'title': obj.title,
                               'pronunciation': obj.pronunciation,
                               'type': obj.type,
                               'definition': obj.definition,
                               'example': obj.example,
                               'image_url': obj.image_url,
                               'emoji': obj.emoji,
                               'deck_id': obj.deck_id}
                      for obj in self.cards}
        }


class DeckList(db.Model):
    __tablename__ = 'deck_lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    cover_photo_url = db.Column(db.String(256))
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)

    creator = db.relationship('User', back_populates='deck_lists')
    decks = db.relationship("Deck", secondary="added_decks",
                            back_populates="deck_lists")

    def add_deck(self, deck):
        if deck not in self.decks:
            self.decks.append(deck)
            return self.to_dict()
        else:
            return {'errors': f"Deck {deck.id} already in list"}

    def remove_deck(self, deck):
        if deck in self.decks:
            self.decks.remove(deck)
            return self.to_dict()
        else:
            return {'errors': f"Could not find deck {deck.id} in list"}

    def simple_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover_photo_url': self.cover_photo_url,
        }

    def to_dict(self):
        owner = str(self.creator.user_name)

        return {
            'id': self.id,
            'title': self.title,
            'cover_photo_url': self.cover_photo_url,
            'creator': owner,
            'decks': {obj.id: {'id': obj.id,
                               'title': obj.title,
                               'cover_photo_url': obj.cover_photo_url,
                               'category': obj.category_type,
                               'category_id': obj.category_id,
                               'creator': obj.deck_owner}
                      for obj in self.decks}
        }
