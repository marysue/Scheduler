from .db import db
from sqlalchemy import DateTime, func
from .company import Company
from .contractor import Contractor


class Placement(db.Model):
  __tablename__ = 'placements'

  id = db.Column(db.Integer, primary_key = True)
  startDate = db.Column(db.DateTime, nullable = False)
  endDate = db.Column(db.DateTime, nullable = True)
  completed = db.Column(db.Boolean, default=True, nullable = False)
  contractorId_fk = db.Column(db.Integer, db.ForeignKey(Contractor.id), nullable = False)
  companyId_fk = db.Column(db.Integer,db.ForeignKey(Company.id), nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractor = db.relationship("Contractor", back_populates="placements", cascade="all, delete-orphan")
  companies = db.relationship("Company", back_populates="placements", cascade="all, delete-orphan")


  @property #getter
  def startDate(self):
    return self.startDate

  @startDate.setter
  def address1(self, startDate):
      self.startDate = startDate

  @property
  def endDate(self):
      return self.endDate

  @endDate.setter
  def endDate(self, endDate):
      self.endDate = endDate

  @property
  def completed(self):
      return self.completed

  @completed.setter
  def completed(self, completed):
      self.completed = completed

  def to_dict(self):
    return {
      "id": self.id,
      "startDate": self.startDate,
      "endDate": self.endDate,
      "completed": self.completed,
      "company": {
        "companyId": self.companies.id,
        "companyName": self.companies.companyName,
        "contactName": self.companies.contactName,
        "contactPhone": self.companies.contactPhone,
        "email": self.companies.email
      },
      "contractor": {
          "contractorId": self.contractor.id,
          "staff_type": self.contractor.staff_type,
      }
    }
