from app.models import db, ContractorContact

# Adds a demo user, you can add other users here if you want
def seed_contractor():

    c1 = ContractorContact(userId_fk=10, companyName='Company 1')
    c2 = ContractorContact(userId_fk=11, companyName='Company 2')

    db.session.add(c1)
    db.session.add(c2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE contractorContacts;')
    db.session.commit()
