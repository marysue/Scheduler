from app.models import db, Placement
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_placements():

    pl1 = Placement(contractorId_fk=8, companyId_fk=1, companyContactId_fk=1,startDate=datetime.strptime('12/20/20', '%m/%d/%y'), endDate=datetime.strptime('12/24/20', '%m/%d/%y'))
    pl2 = Placement(contractorId_fk=8, companyId_fk=1, companyContactId_fk=1,startDate=datetime.strptime('12/19/20', '%m/%d/%y'), endDate=datetime.strptime('12/19/20', '%m/%d/%y'))
    pl3 = Placement(contractorId_fk=8, companyId_fk=2, companyContactId_fk=5,startDate=datetime.strptime('12/29/20', '%m/%d/%y'), endDate=datetime.strptime('12/29/20', '%m/%d/%y'))
    pl4 = Placement(contractorId_fk=5, companyId_fk=2, companyContactId_fk=5,startDate=datetime.strptime('12/21/20', '%m/%d/%y'), endDate=datetime.strptime('12/23/20', '%m/%d/%y'))
    pl5 = Placement(contractorId_fk=5, companyId_fk=1, companyContactId_fk=4,startDate=datetime.strptime('12/27/20', '%m/%d/%y'), endDate=datetime.strptime('12/28/20', '%m/%d/%y'))
    pl6 = Placement(contractorId_fk=5, companyId_fk=1, companyContactId_fk=3,startDate=datetime.strptime('12/29/20', '%m/%d/%y'), endDate=datetime.strptime('12/30/20', '%m/%d/%y'))


    db.session.add(pl1)
    db.session.add(pl2)
    db.session.add(pl3)
    db.session.add(pl4)
    db.session.add(pl5)
    db.session.add(pl6)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_placements():
    db.session.execute('TRUNCATE placements;')
    db.session.commit()
