from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    d1 = User(username='Demo', email='demo@aa.io', password='password', userType='admin')
    d2 = User(username='Dental Assistant 1', email='da1@da1.com', password='password', userType='contractor')
    d3 = User(username='Dental Assistant 2', email='da2@da2.com', password='password', userType='contractor')
    d4 = User(username='Dentist 1', email='dentist1@dentist1.com', password='password', userType='contractor')
    d5 = User(username='Dentist 2', email='dentist2@dentist2.com', password='password', userType='contractor')
    d6 = User(username='Dental Hygenist 1', email='dh1@dh1.com', password='password', userType='contractor')
    d7 = User(username='Dental Hygenist 2', email='dh2@dh2.com', password='password', userType='contractor')
    d8 = User(username='Front Office 1', email='fo1@fo1.com', password='password', userType='contractor')
    d9 = User(username='Front Office 2', email='fo2@fo2.com', password='password', userType='contractor')
    d10 = User(username='Company 1', email='co1@co1.com', password='password', userType='company')
    d11 = User(username='Company 2', email='co2@co2.com', password='password', userType='company')
    d12 = User(username='Agency', email='agency@agency.com', password='password', userType='admin')

    db.session.add(d1)
    db.session.add(d2)
    db.session.add(d3)
    db.session.add(d4)
    db.session.add(d5)
    db.session.add(d6)
    db.session.add(d7)
    db.session.add(d8)
    db.session.add(d9)
    db.session.add(d10)
    db.session.add(d11)
    db.session.add(d12)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
