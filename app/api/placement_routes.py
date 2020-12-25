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

def getCompanyInfo(placement):
    companyInfo = {}
    startDate = datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")
    endDate = datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S")
    companyInfo = {
        "companyInfo": {
            "companyName": placement["company"]["companyName"],
            "name": placement["companyContact"]["name"],
            "phone": placement["companyContact"]["phone"],
            "email": placement["companyContact"]["email"],
            "city": placement["companyContact"]["city"],
            "startTime": str(startDate.hour) + ":" + str(startDate.minute),
            "endTime": str(endDate.hour) + ":" + str(endDate.minute),
            "startDate": str(startDate),
            "endDate": str(endDate)
        }
    }
    return companyInfo

def addTo(a_dict, key, ci):
    if (key in a_dict.keys()):
        a_dict[key].append(ci)
    else:
        a_dict[key] = [ ci ]
    return a_dict

def createPlacements(placements, userType):
    a_dict = {}

    for placement in placements:
        if (userType == 'company'):
            ci = getContractorInfo(placement)
        elif (userType == 'contractor'):
            ci = getCompanyInfo(placement)
        elif (userType == 'agency'):
            ci = getCompanyInfo(placement)

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


#Given a companyid, Creates a new placement
@placement_routes.route('/<int:companyId>', methods=['POST'])
# @login_required
def addPlacement(companyId):
    # print("Received add request for placement.")
    form = PlacementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print("Form is valid ... creating placement now")
        # print("contractorId: ", form.data['contractorId'])
        # print("companyId: ", companyId)
        # print("companyContactId: ", form.data['companyContactId'])
        # print("startDate: ", datetime.strptime(form.data['startDate'], '%Y-%m-%d %H:%M:%S'))
        # print("endDate: ", datetime.strptime(form.data['endDate'], '%Y-%m-%d %H:%M:%S'))

        newPlacement = Placement(
            contractorId_fk=form.data['contractorId'],
            companyId_fk=companyId,
            companyContactId_fk=form.data['companyContactId'],
            startDate=datetime.strptime(form.data['startDate'], '%Y-%m-%d %H:%M:%S'),
            endDate=datetime.strptime(form.data['endDate'], '%Y-%m-%d %H:%M:%S')
        )
        db.session.add(newPlacement)
        # start = datetime.strptime(form.data['startDate'], '%Y-%m-%d %H:%M:%S')
        # end = datetime.strptime(form.data['endDate'], '%Y-%m-%d %H:%M:%S')
        # delta = end - start
        # next = start
        # for x in range(0, delta.days +1):
        #     new = BlockedDate(
        #         contractorId_fk=form.data['companyContactId'],
        #         companyContactId_fk=id,
        #         blocked=next)
        #     db.session.add(new)
        #     next = next + timedelta(days=1)
        db.session.commit()
        # return newPlacement.to_dict()

    return 'ok'

def createContractorPlacementTableInfo(placements):
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

def createCompanyPlacementTableInfo(placements):
    placementInfo = []

    for placement in placements:
        startDate = datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")
        endDate = datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S")
        companyInfo = {
            "companyInfo": {
                "companyName": placement["company"]["companyName"],
                "name": placement["companyContact"]["name"],
                "phone": placement["companyContact"]["phone"],
                "email": placement["companyContact"]["email"],
                "address": placement["companyContact"]["addr1"] + ", " + placement["companyContact"]["addr2"],
                "city": placement["companyContact"]["city"],
                "startTime": str(startDate.hour) + ":" + str(startDate.minute),
                "endTime": str(endDate.hour) + ":" + str(endDate.minute),
                "startDate": str(startDate),
                "endDate": str(endDate)
            }
        }
        placementInfo.append(companyInfo)
    return placementInfo

######################CONTRACTOR SPECIFIC PLACEMENTS
#Returns ALL placements for a given contractor
@placement_routes.route('/contractor/<int:contractorId>', methods=['GET'])
def getContrPlacements(contractorId):
    placements = Placement.query.filter(Placement.contractorId_fk == contractorId).order_by(Placement.startDate).all()
    return {"placements": [placement.to_dict() for placement in placements]}

@placement_routes.route('/contractor/calendarInfo/<int:contractorId>', methods=['GET'])
def getContrPlacementCalendarInfo(contractorId):
  placements = Placement.query.filter(Placement.contractorId_fk == contractorId).order_by(Placement.startDate).all()
  placementStruct = createPlacements([placement.to_dict() for placement in placements], "contractor")
  return (placementStruct)

@placement_routes.route('/contractor/tableInfo/<int:contractorId>', methods=['GET'])
def getContrPlacementTableInfo(contractorId):
    placements = Placement.query.filter(Placement.contractorId_fk == contractorId).order_by(Placement.startDate).all()
    placementTableStruct = createCompanyPlacementTableInfo([placement.to_dict() for placement in placements])
    return {"placements": placementTableStruct}


########################COMPANY SPECIFIC PLACEMENTS
#Returns ALL placements for a given company
@placement_routes.route('/company/calendarInfo/<int:companyId>', methods=['GET'])
def getCoPlacementDateInfo(companyId):
    placements =  Placement.query.filter(Placement.companyId_fk == companyId).order_by(Placement.startDate).all()
    placementStruct = createPlacements([placement.to_dict() for placement in placements], "company")
    return placementStruct

@placement_routes.route('/company/tableInfo/<int:companyId>', methods=['GET'])
def getCoPlacementTableInfo(companyId):
    placements = Placement.query.filter(Placement.companyId_fk == companyId).order_by(Placement.startDate).all()
    placementTableStruct = createContractorPlacementTableInfo([placement.to_dict() for placement in placements])
    return {"placements": placementTableStruct}

#########################AGENCY PLACEMENTS
#Returns ALL placements for the agency
@placement_routes.route('/agency/all', methods=['GET'])
#@login_required
def getAll():
    placements = Placement.query.all()
    return {"placements": [placement.to_dict() for placement in placements]}

@placement_routes.route('/agency/calendarInfo', methods=['GET'])
def getAllPlacementDateInfo():
    placements = Placement.query.order_by(Placement.startDate).all()
    placementStruct  = createPlacements([placement.to_dict() for placement in placements], "agency")
    return placementStruct

@placement_routes.route('/agency/tableInfo', methods=['GET'])
def getAllTableInfo():
    placements = Placement.query.order_by(Placement.startDate).all()
    placementStruct  = createCompanyPlacementTableInfo([placement.to_dict() for placement in placements])
    return {"placements": placementStruct}
