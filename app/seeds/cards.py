from app.models import db, Card
import json


def seed_cards():
    cards1 = open('./app/seeds/card_seeds/cards_1.json')
    data = json.load(cards1)

    for key in data:
        newCard = Card(title=data[key]['word'],
                       pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=1, user_id=1)
        db.session.add(newCard)

    cards2 = open('./app/seeds/card_seeds/cards_2.json')
    data = json.load(cards2)

    for key in data:
        newCard = Card(title=data[key]['word'],
                       pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=2, user_id=1)
        db.session.add(newCard)

    cards3 = open('./app/seeds/card_seeds/cards_3.json')
    data = json.load(cards3)

    for key in data:
        newCard = Card(title=data[key]['word'],
                       pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=3, user_id=1)
        db.session.add(newCard)

    cards4 = open('./app/seeds/card_seeds/cards_3.json')
    data = json.load(cards4)

    for key in data:
        newCard = Card(title=data[key]['word'],
                       pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=4, user_id=1)
        db.session.add(newCard)

    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
