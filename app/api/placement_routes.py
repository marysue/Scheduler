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

def getAgencyInfo(placement):
    print ("*************************************************")
    print("placementInfo: ", placement["contractor"])
    print ("*************************************************")
    companyInfo = {}
    startDate = datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")
    endDate = datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S")
    companyInfo = {
        "agencyInfo": {
            "companyName": placement["company"]["companyName"],
            "contactName": placement["companyContact"]["name"],
            "contactPhone": placement["companyContact"]["phone"],
            "contactEmail": placement["companyContact"]["email"],
            "contactAddress": placement["companyContact"]["addr1"] + " " + placement["companyContact"]["addr2"],
            "contactCity": placement["companyContact"]["city"],
            "contactState": placement["companyContact"]["state"],
            "contactZip": placement["companyContact"]["zip"],
            "startTime": str(startDate.hour) + ":" + str(startDate.minute),
            "endTime": str(endDate.hour) + ":" + str(endDate.minute),
            "startDate": str(startDate),
            "endDate": str(endDate),
            "contractorName": placement["contractor"]["contractorContact"]["name"],
            "staffType": placement["contractor"]["staffType"],
            "contractorPhone": placement["contractor"]["contractorContact"]["phone"],
            "contractorEmail": placement["contractor"]["contractorContact"]["email"],
            "contractorCity": placement["contractor"]["contractorContact"]["city"],
            "contractorAddress": placement["contractor"]["contractorContact"]["addr1"] + " " + placement["contractor"]["contractorContact"]["addr2"],
            "contractorState": placement["contractor"]["contractorContact"]["state"],
            "contractorZip": placement["contractor"]["contractorContact"]["zip"],
        }
    }
    return companyInfo

def getAllCompanyPlacementInfo(placements):
    agencyPlacementInfo = []
    for placement in placements:
        startDate = datetime.strptime(placement["startDate"], "%Y-%m-%d %H:%M:%S")
        endDate = datetime.strptime(placement["endDate"], "%Y-%m-%d %H:%M:%S")
        agencyInfo = {
        "agencyInfo": {
            "companyName": placement["company"]["companyName"],
            "contactName": placement["companyContact"]["name"],
            "contactPhone": placement["companyContact"]["phone"],
            "contactEmail": placement["companyContact"]["email"],
            "contactAddress": placement["companyContact"]["addr1"] + " " + placement["companyContact"]["addr2"],
            "contactCity": placement["companyContact"]["city"],
            "contactState": placement["companyContact"]["state"],
            "contactZip": placement["companyContact"]["zip"],
            "startTime": str(startDate.hour) + ":" + str(startDate.minute),
            "endTime": str(endDate.hour) + ":" + str(endDate.minute),
            "startDate": str(startDate),
            "endDate": str(endDate),
            "contractorName": placement["contractor"]["contractorContact"]["name"],
            "staffType": placement["contractor"]["staffType"],
            "contractorPhone": placement["contractor"]["contractorContact"]["phone"],
            "contractorEmail": placement["contractor"]["contractorContact"]["email"],
            "contractorCity": placement["contractor"]["contractorContact"]["city"],
            "contractorAddress": placement["contractor"]["contractorContact"]["addr1"] + " " + placement["contractor"]["contractorContact"]["addr2"],
            "contractorState": placement["contractor"]["contractorContact"]["state"],
            "contractorZip": placement["contractor"]["contractorContact"]["zip"],
            }
        }
        agencyPlacementInfo.append(agencyInfo)
    return agencyPlacementInfo


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
            ci = getAgencyInfo(placement)

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
    form = PlacementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPlacement = Placement(
            contractorId_fk=form.data['contractorId'],
            companyId_fk=companyId,
            companyContactId_fk=form.data['companyContactId'],
            startDate=datetime.strptime(form.data['startDate'], '%Y-%m-%d %H:%M:%S'),
            endDate=datetime.strptime(form.data['endDate'], '%Y-%m-%d %H:%M:%S')
        )
        db.session.add(newPlacement)
        db.session.commit()

    placements = Placement.query.order_by(Placement.startDate).all()
    placementTableStruct = createContractorPlacementTableInfo([placement.to_dict() for placement in placements])
    return {"placements": placementTableStruct}


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

def createAgencyPlacementTableInfo(placements):
    placementInfo = []

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
#Returns ALL placements ALL Contractors
@placement_routes.route('/agency/contractor/all', methods=['GET'])
def getAllContrPlacements():
    placements = Placement.query.order_by(Placement.startDate).all()
    return {"placements": [placement.to_dict() for placement in placements]}

@placement_routes.route('/agency/contractor/calendarInfo/all', methods=['GET'])
def getAllContrPlacementCalendarInfo():
  placements = Placement.query.order_by(Placement.startDate).all()
  placementStruct = createPlacements([placement.to_dict() for placement in placements], "contractor")
  return (placementStruct)

@placement_routes.route('/agency/contractor/tableInfo/all', methods=['GET'])
def getAllContrPlacementTableInfo():
    placements = Placement.query.order_by(Placement.startDate).all()
    placementTableStruct = getAllCompanyPlacementInfo([placement.to_dict() for placement in placements])
    return {"placements": placementTableStruct}

########### Returns ALL company placement information
@placement_routes.route('/agency/company/calendarInfo/all', methods=['GET'])
def getAllCoPlacementDateInfo():
    placements =  Placement.query.order_by(Placement.startDate).all()
    placementStruct = createPlacements([placement.to_dict() for placement in placements], "agency")
    return placementStruct

@placement_routes.route('/agency/company/tableInfo/all', methods=['GET'])
def getAllCoPlacementTableInfo():
    placements = Placement.query.order_by(Placement.startDate).all()
    # placementTableStruct = createContractorPlacementTableInfo([placement.to_dict() for placement in placements])
    retVal = getAllCompanyPlacementInfo([placement.to_dict() for placement in placements])
    print("***********************RET VAL******************************")
    print(retVal)
    return {"agencyInfo": retVal}

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
