from app.models import db, Deck


def seed_decks():
    deck1 = Deck(title="Noun Starter Deck",
                 cover_photo_url="https://images.unsplash.com/photo-1558244661-d248897f7bc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                 category_id=1,
                 user_id=1,
                 has_image=True)
    deck2 = Deck(title="Adjective Starter Deck",
                 cover_photo_url="https://images.unsplash.com/photo-1559644705-15d30e582900?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1319&q=80",
                 category_id=2,
                 user_id=1,
                 has_image=True)
    deck3 = Deck(title="Verb Starter Deck",
                 cover_photo_url="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
                 category_id=3,
                 user_id=1,
                 has_image=True)
    deck4 = Deck(title="Mixed Deck",
                 cover_photo_url="https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                 category_id=4,
                 user_id=1,
                 has_image=True)
    db.session.add(deck1)
    db.session.add(deck2)
    db.session.add(deck3)
    db.session.add(deck4)
    db.session.commit()


def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
