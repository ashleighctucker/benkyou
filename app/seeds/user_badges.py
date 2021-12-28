from app.models import db, UserBadge, User
from faker import Faker
from random import randrange
from datetime import datetime

fake = Faker()


def seed_user_badges():
    users = db.session.query(User).all()
    for user in users:
        if user.id == 1:
            continue
        else:
            rand_b_award = randrange(0, 5)
            if rand_b_award == 0:
                continue
            else:
                i = 1
                while i <= rand_b_award:
                    seed_badge = UserBadge(
                        user_id=user.id, badge_id=i, created_on=fake.date_this_month())
                    db.session.add(seed_badge)
                    i += 1
    db.session.commit()


def undo_user_badges():
    db.session.execute('TRUNCATE user_badges RESTART IDENTITY CASCADE;')
    db.session.commit()
