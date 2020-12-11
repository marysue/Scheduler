from .db import db
from sqlalchemy import DateTime, func


class BlockedDate(db.Model):
  __tablename__ = 'blockedDates'

  id = db.Column(db.Integer, primary_key = True)
  contractorId_fk = db.Column(db.Integer, db.ForeignKey("contractors.id"), nullable = False)
  blocked = db.Column(db.DateTime, nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractor = db.relationship("Contractor", back_populates="blockedDates")

  def to_dict(self):
    return {
      "id": self.id,
      "contractorId": self.contractor.id,
      "blocked": self.blocked,
  }
