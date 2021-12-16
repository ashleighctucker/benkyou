from .db import db
from datetime import datetime


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
