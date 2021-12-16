from .db import db
from datetime import datetime

Added_Decks = db.Table('added_decks', db.metadata, db.Column(
    "deck_list_id", db.ForeignKey('deck_lists.id'), primary_key=True), db.Column('deck_id', db.ForeignKey('decks.id'),  primary_key=True))


class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    cover_photo_url = db.Column(db.String(256))
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
        'DeckList', secondary=Added_Decks, back_populates="decks")

    def to_dict(self):
        cat = str(self.category.title)
        owner = str(self.creator.user_name)

        return {
            'id': self.id,
            'title': self.title,
            'cover_photo_url': self.cover_photo_url,
            'category': cat,
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
                               'updated_on': obj.updated_on}
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
    decks = db.relationship("Deck", secondary=Added_Decks,
                            back_populates="deck_lists")

    def to_dict(self):
        owner = str(self.creator.user_name)

        return {
            'id': self.id,
            'title': self.title,
            'cover_photo_url': self.cover_photo_url,
            'creator': owner,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
        }
