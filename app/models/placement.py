from .db import db
from sqlalchemy import DateTime, func


class Placement(db.Model):
  __tablename__ = 'placements'

  id = db.Column(db.Integer, primary_key = True)
  startDate = db.Column(db.DateTime, nullable = False)
  endDate = db.Column(db.DateTime, nullable = True)
  completed = db.Column(db.Boolean, default=True, nullable = False)
  contractorId_fk = db.Column(db.Integer, db.ForeignKey("contractors.id"), nullable = False)
  companyId_fk = db.Column(db.Integer,db.ForeignKey("companies.id"), nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  def to_dict(self):
    return {
      "id": self.id,
      "startDate": self.startDate,
      "endDate": self.endDate,
      "completed": self.completed,
      "contractorId": self.contractorId_fk,
      "companyId": self.companyId_fk
    }
