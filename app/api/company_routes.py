from flask import Blueprint, jsonify, session, request
from app.models import db, CompanyContact, Company
from app.forms import CompanyContactForm, CompanyForm
from flask_login import login_required

company_routes = Blueprint('company', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages
#Creates a new company for a given user id
@company_routes.route('/add/<int:id>', methods=['POST'])
# @login_required
def addCompany(id):
    form = CompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newCompany = Company(
            userId_fk=id,
            companyName=form.data['companyName'],
        )
        db.session.add(newCompany)
        db.session.commit()
        return newCompany.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors)}

#Creates a new company contact for a given company id
@company_routes.route('/contact/<int:id>', methods=['POST'])
# @login_required
def addCompanyContact(id):
    form = CompanyContactForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newContact = CompanyContact(
            companyId_fk=id,
            companyName=form.data['companyName'],
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

#Returns ALL locations for a given company, as well as company information
@company_routes.route('/info/<int:id>', methods=['GET'])
# @login_required
def getCompanyContact(id):
    contactInfo =  Company.query.get(id)
    if (contactInfo):
        return contactInfo.to_dict()
    else:
        return {'errors': ['Not Found']}, 404

#Returns company object for given user id
@company_routes.route('/<int:userId>', methods=['GET'])
# @login_required
def getCompany(userId):
    company = Company.query.filter(Company.userId_fk == userId).all();
    print('Company: ', company)
    if (len(company) > 0):
        ci = company[0].to_dict()
        print("ci:  ", ci["companyContacts"])
        return { "id": ci["id"], "userId": ci["userId"], "companyName": ci["companyName"], "companyContacts": ci["companyContacts"] }
    else:
        return {'errors': ['Not Found']}, 404
