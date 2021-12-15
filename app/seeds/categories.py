from app.models import db, Category


def seed_categories():
    category = Category(title="nouns", color_hex="blue")
    db.session.add(category)
    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
