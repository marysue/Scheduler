from app.models import db, ContractorContact

# Adds a demo user, you can add other users here if you want
def seed_contractorContacts():

    c1 = ContractorContact(contractorId_fk=1, name='Dental Assistant 1', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c2 = ContractorContact(contractorId_fk=2, name='Dental Assistant 2', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c3 = ContractorContact(contractorId_fk=3, name='Dentist 1', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c4 = ContractorContact(contractorId_fk=4, name='Dentist 2', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c5 = ContractorContact(contractorId_fk=5, name='Dental Hygenist 1', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c6 = ContractorContact(contractorId_fk=6, name='Dental Hygenist 2', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c7 = ContractorContact(contractorId_fk=7, name='Front Office Staff 1', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')
    c8 = ContractorContact(contractorId_fk=8, name='Front Office Staff 2', phone='209-555-1111', email='faker@faker.com', addr1='123 Main St', addr2='Apt B', city='Modesto', state='CA', zip='94512-3456')

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
def undo_contractorContacts():
    db.session.execute('TRUNCATE contractorContacts;')
    db.session.commit()
