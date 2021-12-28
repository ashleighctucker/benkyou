from app.models import db, Badge


def seed_badges():
    b1 = Badge(title="First Benkyou", threshold=1)
    b2 = Badge(title="Study Buddy", threshold=3)
    b3 = Badge(title="Word Nerd", threshold=5)
    b4 = Badge(title="Word Wiz", threshold=7)
    b5 = Badge(title="Big Brain", threshold=10)

    db.session.add(b1)
    db.session.add(b2)
    db.session.add(b3)
    db.session.add(b4)
    db.session.add(b5)
    db.session.commit()


def undo_badges():
    db.session.execute('TRUNCATE badges RESTART IDENTITY CASCADE;')
    db.session.commit()
