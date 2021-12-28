from enum import unique
from app.models import db, Deck, User
from faker import Faker
from random import randrange

fake = Faker()


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
    deck5 = Deck(title="My Fun Mix", cover_photo_url="https://images.unsplash.com/photo-1611137577061-ad9154062d6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
                 category_id=4,
                 user_id=2,
                 has_image=True)
    deck6 = Deck(title="Another Mixed Deck", cover_photo_url="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
                 category_id=4,
                 user_id=2,
                 has_image=True)
    deck7 = Deck(title="Verb Deck", cover_photo_url="https://images.unsplash.com/photo-1538708591342-2dcd6706e3b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcwfHxsZWFybmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                 category_id=3,
                 user_id=2,
                 has_image=True)

    db.session.add(deck1)
    db.session.add(deck2)
    db.session.add(deck3)
    db.session.add(deck4)
    db.session.add(deck5)
    db.session.add(deck6)
    db.session.add(deck7)

    users = db.session.query(User).all()
    for user in users:
        for deck in range(0, 5):
            cat_id = randrange(1, 4)
            user_id = user.id
            seed_title = fake.words(nb=3, unique=True)
            seed_title.append('Deck')
            seed_deck = Deck(title=" ".join(seed_title),
                             category_id=cat_id, user_id=user_id)
            db.session.add(seed_deck)
    db.session.commit()


def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
