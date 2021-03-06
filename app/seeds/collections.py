from app.models import db, Collection, AddedDeck


def seed_collections():
    collection_1 = Collection(title="My Starter Collection",
                              cover_photo_url="https://images.unsplash.com/photo-1639422704145-1264b281af8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80", has_image=True, user_id=1)
    add1 = AddedDeck(deck_id=1, collection_id=1)
    add2 = AddedDeck(deck_id=2, collection_id=1)
    add3 = AddedDeck(deck_id=3, collection_id=1)

    collection_2 = Collection(title="Mixed Deck Collection",
                              cover_photo_url="https://images.unsplash.com/photo-1615483583516-d17ddb7862ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80", has_image=True, user_id=1)
    add4 = AddedDeck(deck_id=1, collection_id=2)
    add5 = AddedDeck(deck_id=2, collection_id=2)
    add6 = AddedDeck(deck_id=3, collection_id=2)
    add7 = AddedDeck(deck_id=4, collection_id=2)

    db.session.add(collection_1)
    db.session.add(collection_2)
    db.session.add(add1)
    db.session.add(add2)
    db.session.add(add3)
    db.session.add(add4)
    db.session.add(add5)
    db.session.add(add6)
    db.session.add(add7)
    db.session.commit()


def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()
