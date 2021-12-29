import faker
from app.models import db, User
from faker import Faker

fake = Faker()


def seed_users():
    demo = User(
        user_name='benkyou', email='benkyou@benkyou.com', password='password', first_name='Benkyou')
    marnie = User(
        user_name='marnie_study', email='marnie@benkyou.com', password='password', first_name='Marnie')
    bobbie = User(
        user_name='bobbie_study', email='bobbie@benkyou.com', password='password', first_name='Bobbie')
    ash = User(user_name='ash_demo', email='ash@benkyou.com',
               password='ellen', first_name='Ash')

    def createFakeUsers():
        i = 0
        while (i < 50):
            fakerUserInfo = fake.simple_profile()
            fakerFirstName = fakerUserInfo['name'].split()[0]
            fakerUser = User(user_name=fakerUserInfo['username'], first_name=fakerFirstName,
                             email=fakerUserInfo['mail'], password=fake.password(length=8))
            db.session.add(fakerUser)
            i += 1

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ash)
    createFakeUsers()

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
