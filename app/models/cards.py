from .db import db
from datetime import datetime


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    pronunciation = db.Column(db.String(256))
    type = db.Column(db.String(256))
    definition = db.Column(db.Text, nullable=False)
    example = db.Column(db.Text)
    has_image = db.Column(db.Boolean, default=False)
    image_url = db.Column(db.String(256))
    emoji = db.Column(db.String(3))
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)

    deck = db.relationship('Deck', back_populates='cards')
    creator = db.relationship('User', back_populates='cards')

    def to_dict(self):

        return {
            'id': self.id,
            'title': self.title,
            'pronunciation': self.pronunciation,
            'type': self.type,
            'definition': self.definition,
            'example': self.example,
            'has_image': self.has_image,
            'image_url': self.image_url,
            'emoji': self.emoji,
            'deck_id': self.deck_id
        }
