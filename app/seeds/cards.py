from app.models import db, Card
import json


def seed_cards():
    cards = open('./app/seeds/cards.json')
    data = json.load(cards)

    for key in data:
        newCard = Card(title=data[key]['word'],
                       pronunciation=data[key]['pronunciation'], type=data[key]['definitions'][0]['type'], definition=data[key]['definitions'][0]['definition'], example=data[key]['definitions'][0]['example'], image_url=data[key]['definitions'][0]['image_url'], emoji=data[key]['definitions'][0]['emoji'], deck_id=1, user_id=1)
        db.session.add(newCard)

    db.session.commit()


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
