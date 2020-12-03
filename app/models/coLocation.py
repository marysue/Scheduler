from .db import db
from sqlalchemy import DateTime, func


class CoLocation(db.Model):
  __tablename__ = 'coLocations'

  id = db.Column(db.Integer, primary_key=True)
  companyId_fk = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable=True)
  streetAddress1 = db.Column(db.String(100), nullable=True)
  streetAddress2 = db.Column(db.String(100), nullable=True)
  city = db.Column(db.String(50), nullable=True)
  state = db.Column(db.String(2), nullable=True)
  zip = db.Column(db.String(10), nullable=True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  company = db.relationship("Company", back_populates=("location"))

  def to_dict(self):
    return {
      "id": self.id,
      "address1": self.address1,
      "address2": self.address2,
      "city": self.city,
      "state": self.state,
      "zip": self.zip,
      "company": {
          "companyId": self.company.id,
          "companyName": self.company.companyName,
          "contactName": self.company.contactName,
          "email": self.company.email,
          "userId": self.company.userId_fk,
          "calendarId": self.company.calendarId_fk
      }
    }
