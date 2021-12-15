from .db import db


class Category (db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False, unique=True)
    color_hex = db.Column(db.String(256), nullable=False, unique=True)

    decks = db.relationship('Deck', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'color_hex': self.color_hex,
        }
