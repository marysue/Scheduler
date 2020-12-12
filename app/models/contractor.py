from .db import db
from sqlalchemy import DateTime, func

class Contractor(db.Model):
  __tablename__ = 'contractors'


  id = db.Column(db.Integer, primary_key = True)
  staffType = db.Column(db.String(40), nullable = False)
  userid_fk = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True, nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractorContact = db.relationship("ContractorContact", back_populates="contractor")
  placements = db.relationship("Placement", back_populates="contractor")
  blockedDates = db.relationship("BlockedDate", back_populates="contractor")

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userid_fk,
      "staffType": self.staffType,
      # "placements": [placement.to_dict() for placement in self.placements],
      # "blockedDates": [date.to_dict() for date in self.blockedDates],
    }

  def less_to_dict(self):
    return {
      "id": self.id,
      "userId": self.userid_fk,
      "staffType": self.staffType,
      "contractorContact": self.contractorContact[0].to_dict(),#[contact.to_dict() for contact in self.contractorContact],
      # "placementIds": [placement.id for placement in self.placements],
      # "blockedDateIds": [date.id for date in self.blockedDates],
    }
