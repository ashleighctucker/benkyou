from .db import db
from datetime import datetime


class Badge(db.Model):
    __tablename__ = 'badges'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    threshold = db.Column(db.Integer, nullable=False)

    users = db.relationship(
        'User', secondary="user_badges", back_populates="badges")

    def add_user_badge(self, user):
        if user not in self.users:
            self.users.append(user)
            return user.id
        else:
            return {'errors': f"User {user.id} already earned badge {self.id}."}


class UserBadge(db.Model):
    __tablename__ = 'user_badges'

    badge_id = db.Column(db.Integer, db.ForeignKey(
        'badges.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    created_on = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
