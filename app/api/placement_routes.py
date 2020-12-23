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

def getContractorInfo(placement):
    contractorInfo = {}
    startDate = datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")
    endDate = datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S")
    contractorInfo = {
        "contractorInfo": {
            "name": placement["contractor"]["contractorContact"]["name"],
            "phone": placement["contractor"]["contractorContact"]["phone"],
            "email": placement["contractor"]["contractorContact"]["email"],
            "staffType": placement["contractor"]["staffType"],
            "city": placement["contractor"]["contractorContact"]["city"],
            "startTime": str(startDate.hour) + ":" + str(startDate.minute),
            "endTime": str(endDate.hour) + ":" + str(endDate.minute),
            "startDate": str(startDate),
            "endDate": str(endDate)
        }
    }
    return contractorInfo


def addTo(a_dict, key, ci):
    if (key in a_dict.keys()):
        a_dict[key].append(ci)
    else:
        a_dict[key] = [ ci ]
    return a_dict


def createPlacements(placements):
    a_dict = {}
    for placement in placements:
        ci = getContractorInfo(placement)
        start = datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")
        end = datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S")
        if (start.year != end.year) or (start.month != end.month) or (start.day != end.day):
            tmpDay = start
            while tmpDay.day != end.day:
                key = str(tmpDay.year) + "-" + str(tmpDay.month) + "-" + str(tmpDay.day)
                a_dict = addTo(a_dict, key, ci)
                tmpDay = tmpDay + timedelta(days=1)
            key = str(tmpDay.year) + "-" + str(tmpDay.month) + "-" + str(tmpDay.day)
            a_dict = addTo(a_dict, key, ci)
        else:
            key = str(start.year) + "-" + str(start.month) + "-" + str(start.day)
            a_dict = addTo(a_dict, key, ci)
    return a_dict

#Returns ALL placements for a given company
@placement_routes.route('/company/<int:id>', methods=['GET'])
# @login_required
def getAllPlacements(id):
    placements =  Placement.query.filter(Placement.companyId_fk == id).order_by(Placement.startDate).all()
    placementStruct = createPlacements([placement.to_dict() for placement in placements])
    return placementStruct
    # return {"placements": [placement.to_dict() for placement in placements]}

#Returns ALL placements for a given contractor
@placement_routes.route('/contractor/<int:id>', methods=['GET'])
def getAllContrPlacements(id):
    placements = Placement.query.filter(Placement.contractorId_fk == id).order_by(Placement.startDate).all()
    return {"placements": [placement.to_dict() for placement in placements]}

@placement_routes.route('/company/calendarInfo/<int:companyId>', methods=['GET'])
def getPlacementDateInfo(companyId):
    placements =  Placement.query.filter(Placement.companyId_fk == companyId).order_by(Placement.startDate).all()
    placementStruct = createPlacements([placement.to_dict() for placement in placements])
    return placementStruct

def createPlacementTableInfo(placements):
    placementInfo = []
    for placement in placements:
        contractorInfo = {
            "contractorInfo": {
                "name": placement["contractor"]["contractorContact"]["name"],
                "phone": placement["contractor"]["contractorContact"]["phone"],
                "email": placement["contractor"]["contractorContact"]["email"],
                "staffType": placement["contractor"]["staffType"],
                "city": placement["contractor"]["contractorContact"]["city"],
                "startDate": str(datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")),
                "endDate": str(datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S"))
            }
        }
        placementInfo.append(contractorInfo)

    return placementInfo

@placement_routes.route('/company/tableInfo/<int:companyId>', methods=['GET'])
def getPlacementTableInfo(companyId):
    placements = Placement.query.filter(Placement.companyId_fk == companyId).order_by(Placement.startDate).all()
    placementTableStruct = createPlacementTableInfo([placement.to_dict() for placement in placements])
    return {"placements": placementTableStruct}

@placement_routes.route('/agency/calendarInfo', methods=['GET'])
def getAllPlacementDateInfo():
    placements = Placement.query.order_by(Placement.startDate).all()
    placementStruct  = createPlacements([placement.to_dict() for placement in placements])
    return placementStruct

@placement_routes.route('/agency/tableInfo', methods=['GET'])
def getAllTableInfo():
    placements = Placement.query.order_by(Placement.startDate).all()
    placementStruct  = createPlacementTableInfo([placement.to_dict() for placement in placements])
    return {"placements": placementStruct}
