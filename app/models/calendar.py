from .db import db
from sqlalchemy import DateTime, func

class Calendar(db.Model):
  __tablename__ = 'calendars'

  id = db.Column(db.Integer, primary_key=True)
  datesAvail = db.Column(db.DateTime, nullable=True)
  datesBlocked = db.Column(db.DateTime, nullable=True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractors = db.relationship("Contractor", back_populates="calendar")
  companies = db.relationship("Company", back_populates="calendars")

  @property #getter
  def datesAvail(self):
    return self.datesAvail

  @datesAvail.setter
  def address1(self, datesAvail):
      self.datesAvail = datesAvail

  @property
  def datesBlocked(self):
      return self.datesBlocked

  @datesBlocked.setter
  def datesBlocked(self, datesBlocked):
      self.datesBlocked = datesBlocked

  def to_dict(self):
    return {
      "id": self.id,
      "datesAvail": self.datesAvail,
      "datesBlocked": self.datesBlocked,
      "contractor": {
          "staff_type": self.contractors.staff_type,
          "id": self.contractors.id
      },
      "company": {
          "companyName": self.companies.companyName,
          "contactName": self.companies.contactName,
          "contactPhone": self.companies.contactPhone,
          "email": self.companies.email,
          "userId_fk": self.companies.userId_fk
      }
    }
