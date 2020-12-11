from .db import db
from sqlalchemy import DateTime, func


class Company(db.Model):
  __tablename__ = 'companies'

  id = db.Column(db.Integer, primary_key = True)
  userId_fk = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  companyName = db.Column(db.String(100), nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  companyContact = db.relationship("CompanyContact", back_populates="company")
  placements = db.relationship("Placement", back_populates="company")

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId_fk,
      "companyName": self.companyName,
      "companyContact": [contact.to_dict() for contact in self.companyContact],
      "placements": [placement.to_dict() for placement in self.placements],
    }
