from .db import db
from sqlalchemy import DateTime, func


class ContrLocation(db.Model):
  __tablename__ = 'contrLocations'

  id = db.Column(db.Integer, primary_key = True)
  streetAddress1 = db.Column(db.String(100), nullable=True)
  streetAddress2 = db.Column(db.String(100), nullable=True)
  city = db.Column(db.String(50), nullable=True)
  state = db.Column(db.String(2), nullable = True)
  zip = db.Column(db.String(10), nullable = True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractors = db.relationship("Contractor", back_populates=("contrLocation"))

  def to_dict(self):
    return {
      "id": self.id,
      "address1": self.address1,
      "address2": self.address2,
      "city": self.city,
      "state": self.state,
      "zip": self.zip,
      "contractor": {
        "staffType": self.contractors.staffType,
        "assigned": self.contractors.assigned,
        "userId": self.contractors.userid_fk,
        "calendarId": self.contractors.calendarId_fk
      }
    }
