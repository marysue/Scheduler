from flask import Blueprint, jsonify, session, request
from app.models import db, Placement, BlockedDate
from app.forms import PlacementForm
from flask_login import login_required
from datetime import datetime, timedelta

placement_routes = Blueprint('placement', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

#Given a companyid, Creates a new placement
@placement_routes.route('/<int:id>', methods=['POST'])
# @login_required
def addPlacement(id):
    form = PlacementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPlacement = Placement(
            contractorId_fk=form.data['contractorId'],
            companyId_fk=id,
            companyContactId_fk=form.data['companyContactId'],
            startDate=datetime.strptime(form.data['startDate'], '%Y-%m-%d %H:%M:%S'),
            endDate=datetime.strptime(form.data['endDate'], '%Y-%m-%d %H:%M:%S')
        )
        db.session.add(newPlacement)
        start = datetime.strptime(form.data['startDate'], '%Y-%m-%d %H:%M:%S')
        end = datetime.strptime(form.data['endDate'], '%Y-%m-%d %H:%M:%S')
        delta = end - start
        next = start
        for x in range(0, delta.days +1):
            new = BlockedDate(
                contractorId_fk=form.data['companyContactId'],
                companyContactId_fk=id,
                blocked=next)
            db.session.add(new)
            next = next + timedelta(days=1)
        db.session.commit()
        return newPlacement.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors)}

#Returns ALL placements
@placement_routes.route('/all', methods=['GET'])
#@login_required
def getAll():
    placements = Placement.query.all()
    return {"placements": [placement.to_dict() for placement in placements]}

#Returns ALL placements for a given company
@placement_routes.route('/company/<int:id>', methods=['GET'])
# @login_required
def getAllPlacements(id):
    placements =  Placement.query.filter(Placement.companyId_fk == id).order_by(Placement.startDate).all()
    return {"placements": [placement.to_dict() for placement in placements]}

#Returns ALL placements for a given contractor
@placement_routes.route('/contractor/<int:id>', methods=['GET'])
def getAllContrPlacements(id):
    placements = Placement.query.filter(Placement.contractorId_fk == id).order_by(Placement.startDate).all()
    return {"placements": [placement.to_dict() for placement in placements]}
