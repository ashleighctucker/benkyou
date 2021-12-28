from app.models import db, Card, User, Deck
from faker import Faker
import json

fake = Faker()


def seed_cards():
    cards1 = open('./app/seeds/card_seeds/cards_1.json')
    data = json.load(cards1)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=1, user_id=1)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=1, user_id=1)
        db.session.add(newCard)

    cards2 = open('./app/seeds/card_seeds/cards_2.json')
    data = json.load(cards2)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=2, user_id=1)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=2, user_id=1)
        db.session.add(newCard)

    cards3 = open('./app/seeds/card_seeds/cards_3.json')
    data = json.load(cards3)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=3, user_id=1)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=3, user_id=1)
        db.session.add(newCard)

    cards4 = open('./app/seeds/card_seeds/cards_4.json')
    data = json.load(cards4)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=4, user_id=1)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=4, user_id=1)
        db.session.add(newCard)

    cards5 = open('./app/seeds/card_seeds/cards_5.json')
    data = json.load(cards5)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=5, user_id=2)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=5, user_id=2)
        db.session.add(newCard)

    cards6 = open('./app/seeds/card_seeds/cards_6.json')
    data = json.load(cards6)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=6, user_id=2)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=6, user_id=2)
        db.session.add(newCard)

    cards7 = open('./app/seeds/card_seeds/cards_7.json')
    data = json.load(cards7)

    for key in data:
        if data[key]['definitions'][0]['image_url']:
            newCard = Card(has_image=True, title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=7, user_id=2)
        else:
            newCard = Card(title=data[key]['word'],
                           pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=7, user_id=2)
        db.session.add(newCard)

    users = db.session.query(User).all()
    for user in users:
        decks = db.session.query(Deck).filter(Deck.user_id == user.id).all()
        for deck in decks:
            for card in range(0, 20):
                seed_title = fake.word()
                type = 'Seed Card'
                definition = fake.sentence()
                seed_card = Card(title=seed_title, type=type,
                                 definition=definition, user_id=user.id, deck_id=deck.id)
                db.session.add(seed_card)

    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
