from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .contractors import seed_contractors, undo_contractors
from .companyContacts import seed_companyContacts, undo_companyContacts
from .contractorContacts import seed_contractorContacts, undo_contractorContacts
from .blockedDates import seed_blockedDates, undo_blockedDates

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_companies()
    # seed_contractors()
    # Add other seed functions here
    # seed_contractorContacts()
    # seed_companyContacts()
    seed_blockedDates()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_companies()
    undo_contractors()
    undo_contractorContacts()
    undo_companyContacts()
    undo_blockedDates()
    # Add other undo functions here
