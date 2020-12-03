from .db import db
from sqlalchemy import DateTime, func

class Contractor(db.Model):
  __tablename__ = 'contractors'

  id = db.Column(db.Integer, primary_key = True)
  staffType = db.Column(db.String(40), nullable=False)
  assigned = db.Column(db.Boolean, default=False, nullable=False)
  contrLocationId_fk = db.Column(db.Integer, db.ForeignKey("contrLocations.id"), nullable = False)
  userid_fk = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  calendarId_fk = db.Column(db.Integer, db.ForeignKey("calendars.id"), nullable = False)

  contrLocation = db.relationship("ContrLocation", back_populates="contractors")

  def to_dict(self):
    return {
      "id": self.id,
      "staffType": self.staffType,
      "assigned": self.assigned,
      "userId": self.userid_fk,
      "calendarId": self.calendarId_fk,
      "contrLocation": {
          "streetAddress1": self.contrLocation.streetAddress1,
          "streetAddress2": self.contrLocation.streetAddress2,
          "city": self.contrLocation.city,
          "state": self.contrLocation.state,
          "zip": self.contrLocation.zip
          },

    }
