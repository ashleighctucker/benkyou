from app.models import db, Category


def seed_categories():
    category1 = Category(title="nouns", color_hex="157A6E")
    category2 = Category(title="adjectives", color_hex="5D2E46")
    category3 = Category(title="verbs", color_hex="E08E45")
    category4 = Category(title="mix", color_hex="EA596E")

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
