from flask import Blueprint, jsonify, session, request
from app.models import db, ContractorContact, Contractor, BlockedDate
from app.forms import ContractorContactForm, ContractorForm
from flask_login import login_required
from datetime import datetime
from datetime import timedelta

contractor_routes = Blueprint('contractor', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

#for a given userid, create a new contractor
@contractor_routes.route('/add/<int:id>', methods=['POST'])
# @login_required
def addContractor(id):
    form = ContractorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newContractor = Contractor(
            staffType=form.data['staffType'],
            userid_fk=id
        )
        db.session.add(newContractor)
        db.session.commit()
        return newContractor.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors)}

#for a given contractorId, add a contractor contact
@contractor_routes.route('/contact/<int:id>', methods=['POST'])
# @login_required
def addContractorContact(id):
    form = ContractorContactForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newContact = ContractorContact(
            contractorId_fk=id,
            name=form.data['name'],
            phone=form.data['phone'],
            email=form.data['email'],
            addr1=form.data['addr1'],
            addr2=form.data['addr2'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
        )
        db.session.add(newContact)
        db.session.commit()
        return newContact.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors)}


@contractor_routes.route('/<int:id>', methods=['GET'])
# @login_required
def getContractorContact(id):
    contactInfo =  ContractorContact.query.get(id)
    return contactInfo.to_dict()

def datesArray(dateRange):
    #split dateRange on "/"
    rangeArray = dateRange.split("/")
    #create startDate, endDate datetime objects
    startDate = datetime.strptime(rangeArray[0], '%Y-%m-%d %H:%M:%S')
    endDate = datetime.strptime(rangeArray[1], '%Y-%m-%d %H:%M:%S')
    delta = endDate - startDate
    rangeArray = []
    next = startDate
    for x in range(0, delta.days + 1):
        rangeArray += [next]
        next = next + timedelta(days=1)
    return rangeArray

#for a given staffType and daterange, return a list of contractors available
@contractor_routes.route('/available', methods=['GET'])
#@login_required
def getAvailableContractors():
    print("requestArgs: ", request.args['staffType'])
    staffType = request.args['staffType']
    print("staff Type ", staffType, " is ", type(staffType))
    dateRange = request.args['dateRange']
    contractors = Contractor.query.filter(Contractor.staffType == staffType).all()
    print("Received contractors:  ", contractors)
    dateRangeArray = datesArray(dateRange)
    print("DateRangeArray:  ", dateRangeArray)
    availableContractors = []
    for contractor in contractors:
        print("Looking at contractor:  ", contractor.id)
        blockedDates = BlockedDate.query.filter(BlockedDate.contractorId_fk == contractor.id).all()
        print("Received blocked dates for contractor:  ", blockedDates)
        available = True
        for blockedDate in blockedDates:
            if blockedDate.blocked in dateRangeArray:
                available = False
        if available:
            availableContractors += [contractor.to_dict()]
    print('Available contractors:  ', availableContractors)
    return { "available": availableContractors }
