from app.models import db, Deck


def seed_decks():
    deck = Deck(title="Noun Starter Deck",
                cover_photo_url="https://flic.kr/p/2mQRFUW",
                category_id=1,
                user_id=1,)
    db.session.add(deck)
    db.session.commit()


def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
