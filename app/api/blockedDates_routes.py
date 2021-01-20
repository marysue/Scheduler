from flask import Blueprint, jsonify, session, request
from app.models import db, BlockedDate
from app.forms import BlockedDateForm
from flask_login import login_required
from datetime import datetime
from urllib.parse import unquote

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
@blockedDate_routes.route('/<int:contractorId>', methods=['POST'])
# @login_required
def addBlockedDate(contractorId):
    form = BlockedDateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        blockedArr = []
        blockedStr = unquote(form.data['blocked'])
        print("blockedStr = ", blockedStr)
        if (blockedStr == ''):
            blockedArr = []
        else:
            blockedArr = blockedStr.split(",")
        print("BlockedArr: ", blockedArr)
        #get all date for this contractor
        allDates = BlockedDate.query.filter(BlockedDate.contractorId_fk == contractorId).all()
        for x in range(0, len(allDates)):
            inArray = False
            print("Looking at allDates[", x, "]: ", allDates[x].to_dict())
            for y in range(0, len(blockedArr)):
                print("Looking at blockedArr[", y, "]: ", blockedArr[y])
                if (blockedArr[y] == allDates[x].blocked):
                    inArray = True
            if (inArray == False):
                BlockedDate.query.filter(BlockedDate.id == allDates[x].id).delete()

        # if date is not in array, add date to array
        for x in range(0, len(blockedArr)):
            blockedObj=datetime.strptime(blockedArr[x], '%m/%d/%Y %I:%M:%S')
            print("Storing date as: ", blockedObj)
            blockedDate = BlockedDate.query.filter(BlockedDate.contractorId_fk == contractorId, BlockedDate.blocked == blockedObj).order_by(BlockedDate.blocked).all()
            #if this date is not in blocked date, then add it.
            if (len(blockedDate) == 0):
                newBlockedDate = BlockedDate(
                     contractorId_fk=contractorId,
                     blocked=blockedObj,
                )
                db.session.add(newBlockedDate)
        db.session.commit()
        today = datetime.now()
        allBlocked = BlockedDate.query.filter(BlockedDate.contractorId_fk== contractorId, BlockedDate.blocked >= today).order_by(BlockedDate.blocked).all()
        return {"blockedDates": [blocked.to_dict() for blocked in allBlocked]}
    else:
        print("Form errors: ", form.errors)
        return 'ok'




#Returns ALL blocked dates for a given contractor <id>
@blockedDate_routes.route('/<int:id>', methods=['GET'])
# @login_required
def getBlockedDates(id):
    today = datetime.now()
    blockedDates =  BlockedDate.query.filter(
        BlockedDate.contractorId_fk == id).order_by(BlockedDate.blocked).all()

    # return ({"blocked": retVal})
    print("****************************************************")
    print("Returning blockedDates: ", [blockedDate.to_dict() for blockedDate in blockedDates])
    return ({"blockedDates": [blocked.to_dict() for blocked in blockedDates]})

@blockedDate_routes.route('/', methods=['GET'])
#@login_required
def getAllBlockedDates():
    today = datetime.now()
    blockedDates = BlockedDate.query.filter(
        BlockedDate.blocked >= today).all()

    return ({"blockedDates": [blockedDate.to_dict() for blockedDate in blockedDates]})
