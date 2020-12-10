from app.models import db, Contractor

# Adds a demo user, you can add other users here if you want
def seed_contractors():

    c1 = Contractor(staffType='Dental Assistant', userid_fk=2)
    c2 = Contractor(staffType='Dental Assistant', userid_fk=3)
    c3 = Contractor(staffType='Dentist', userid_fk=4)
    c4 = Contractor(staffType='Dentist', userid_fk=5)
    c5 = Contractor(staffType='Dental Hygenist', userid_fk=6)
    c6 = Contractor(staffType='Dental Hygenist', userid_fk=7)
    c7 = Contractor(staffType='Front Office', userid_fk=8)
    c8 = Contractor(staffType='Front Office', userid_fk=8)

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)
    db.session.add(c7)
    db.session.add(c8)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_contractors():
    db.session.execute('TRUNCATE contractors;')
    db.session.commit()
