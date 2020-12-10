from app.models import db, CompanyContact

# Adds a demo user, you can add other users here if you want
def seed_companyContacts():

    c1 = CompanyContact(companyId_fk=1, companyName='ABC-West Dental', name='Abc West Contact', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Suite 1102', city='Modesto', state='CA', zip='94512-3456')
    c2 = CompanyContact(companyId_fk=1, companyName='ABC-East Pediatric Dental', name='Abc East Contact', phone='209-555-1111', email='faker@faker.com', addr1='1450 Co Rd. B', addr2='Suite 5', city='Modesto', state='CA', zip='94512-3456')
    c3 = CompanyContact(companyId_fk=1, companyName='ABC-North Orthodontic Dentistry', name='Abc North Contact', phone='209-555-1111', email='faker@faker.com', addr1='376 State St.', addr2='', city='Modesto', state='CA', zip='94512-3456')
    c4 = CompanyContact(companyId_fk=1, companyName='ABC-South Dental', name='Abc South Contact', phone='209-555-1111', email='faker@faker.com', addr1='5505 Hwy 5 So', addr2='Suite 24', city='Modesto', state='CA', zip='94512-3456')
    c5 = CompanyContact(companyId_fk=2, companyName='Twinkle Dental', name='Twinkle Dental Contact', phone='209-555-1111', email='faker@faker.com', addr1='155 Main St', addr2='Ste A', city='Modesto', state='CA', zip='94512-3456')


    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_companyContacts():
    db.session.execute('TRUNCATE companyContacts;')
    db.session.commit()
