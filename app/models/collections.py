from .db import db
from datetime import datetime


class Collection(db.Model):
    __tablename__ = 'collections'

    # db props
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    has_image = db.Column(db.Boolean, default=False)
    cover_photo_url = db.Column(db.String(256))
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # relationships
    creator = db.relationship('User', back_populates='collections')
    decks = db.relationship("Deck", secondary="added_decks",
                            back_populates="collections")

    def add_deck(self, deck):
        if deck not in self.decks:
            self.decks.append(deck)
            return {'id': deck.id,
                    'title': deck.title,
                    'cover_photo_url': deck.cover_photo_url,
                    'category': deck.category_type,
                    'category_id': deck.category_id,
                    'has_image': deck.has_image,
                    'created_on': deck.created_on,
                    'cards_amount': deck.cards_amount,
                    'creator': deck.deck_owner}
        else:
            return {'errors': f"Deck {deck.title} already in collection"}

    def remove_deck(self, deck):
        if deck in self.decks:
            self.decks.remove(deck)
            return {'id': deck.id}
        else:
            return {'errors': f"Could not find deck {deck.title} in collection"}

    def get_cards(self):
        cards = [obj.cardlist for obj in self.decks]

        return cards

    def simple_dict(self):
        return {
            'id': self.id,
            'title': self.title,
        }

    def to_dict(self):
        owner = str(self.creator.user_name)

        return {
            'id': self.id,
            'title': self.title,
            'cover_photo_url': self.cover_photo_url,
            'creator': owner,
            'created_on': self.created_on,
            'has_image': self.has_image,
            'owner_id': self.user_id,
            'decks': {obj.id: {'id': obj.id,
                               'color': obj.cat_color,
                               'title': obj.title,
                               'cover_photo_url': obj.cover_photo_url,
                               'category': obj.category_type,
                               'category_id': obj.category_id,
                               'has_image': obj.has_image,
                               'created_on': obj.created_on,
                               'cards_amount': obj.cards_amount,
                               'creator': obj.deck_owner}
                      for obj in self.decks}
        }
