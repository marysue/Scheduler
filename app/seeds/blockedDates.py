from app.models import db, BlockedDate
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_blockedDates():

    bd1 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('12/25/20', '%m/%d/%y'))
    bd2 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('12/26/20', '%m/%d/%y'))
    bd3 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('12/27/20', '%m/%d/%y'))
    bd4 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('12/28/20', '%m/%d/%y'))
    bd5 = BlockedDate(contractorId_fk=2, blocked=datetime.strptime('12/25/20', '%m/%d/%y'))
    bd6 = BlockedDate(contractorId_fk=2, blocked=datetime.strptime('12/29/20', '%m/%d/%y'))
    bd7 = BlockedDate(contractorId_fk=2, blocked=datetime.strptime('01/01/21', '%m/%d/%y'))
    bd8 = BlockedDate(contractorId_fk=3, blocked=datetime.strptime('12/31/20', '%m/%d/%y'))
    bd9 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('11/10/20', '%m/%d/%y'))
    bd10 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('11/11/20', '%m/%d/%y'))
    bd11 = BlockedDate(contractorId_fk=1, blocked=datetime.strptime('11/12/20', '%m/%d/%y'))

    db.session.add(bd1)
    db.session.add(bd2)
    db.session.add(bd3)
    db.session.add(bd4)
    db.session.add(bd5)
    db.session.add(bd6)
    db.session.add(bd7)
    db.session.add(bd8)
    db.session.add(bd9)
    db.session.add(bd10)
    db.session.add(bd11)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_blockedDates():
    db.session.execute('TRUNCATE blockedDates;')
    db.session.commit()
