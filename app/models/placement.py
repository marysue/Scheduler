from .db import db
from sqlalchemy import DateTime, func


class Placement(db.Model):
  __tablename__ = 'placements'

  id = db.Column(db.Integer, primary_key = True)
  startDate = db.Column(db.DateTime, nullable = False)
  endDate = db.Column(db.DateTime, nullable = True)
  contractorId_fk = db.Column(db.Integer, db.ForeignKey("contractors.id"), nullable = False)
  companyId_fk = db.Column(db.Integer,db.ForeignKey("companies.id"), nullable = False)
  companyContactId_fk = db.Column(db.Integer, db.ForeignKey("companyContacts.id"), nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  company = db.relationship("Company", back_populates="placements")
  companyContact = db.relationship("CompanyContact", back_populates="placements")
  contractor = db.relationship("Contractor", back_populates="placements")

  def to_dict(self):
    return {
      "id": self.id,
      "contractor": self.contractor.less_to_dict(),
      "company": self.company.less_to_dict(),
      "companyContact": self.companyContact.to_dict(),
      "startDate": self.startDate,
      "endDate": self.endDate,
    }

  def less_to_dict(self):
    return {
      "id": self.id,
      "contractors": [contractor.less_to_dict() for contractor in self.contractor],
      "companyContacts": [companyContact.less_to_dict() for companyContact in self.companyContact],
      "startDate": self.startDate,
      "endDate": self.endDate,
  }
