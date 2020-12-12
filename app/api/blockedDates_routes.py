from flask import Blueprint, jsonify, session, request
from app.models import db, BlockedDate
from app.forms import BlockedDateForm
from flask_login import login_required
from datetime import datetime

blockedDate_routes = Blueprint('blocked', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

#Creates a new blocked date for contractor <id>
@blockedDate_routes.route('/<int:id>', methods=['POST'])
# @login_required
def addBlockedDate(id):
    form = BlockedDateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newBlockedDate = BlockedDate(
            contractorId_fk=id,
            blocked=datetime.strptime(form.data['blocked'], '%Y-%m-%d %H:%M:%S')
        )
        db.session.add(newBlockedDate)
        db.session.commit()
        return newBlockedDate.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors)}

#Returns ALL blocked dates for a given contractor <id>
@blockedDate_routes.route('/<int:id>', methods=['GET'])
# @login_required
def getBlockedDates(id):
    today = datetime.now()
    blockedDates =  BlockedDate.query.filter(
        BlockedDate.contractorId_fk == id, BlockedDate.blocked >= today).order_by(BlockedDate.blocked).all()
    return ({"blockedDates": [blockedDate.to_dict() for blockedDate in blockedDates]})

@blockedDate_routes.route('/', methods=['GET'])
#@login_required
def getAllBlockedDates():
    today = datetime.now()
    blockedDates = BlockedDate.query.filter(
        BlockedDate.blocked >= today).all()
    return ({"blockedDates": [blockedDate.to_dict() for blockedDate in blockedDates]})
