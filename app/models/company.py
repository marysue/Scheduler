from .db import db
from sqlalchemy import DateTime, func


class Company(db.Model):
  __tablename__ = 'companies'

  id = db.Column(db.Integer, primary_key = True)
  companyName = db.Column(db.String(100), nullable = False)
  contactName = db.Column(db.String(100), nullable = False)
  contactPhone = db.Column(db.String(12), nullable = False)
  email = db.Column(db.String(100), nullable = True)
  userId_fk = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  calendarId_fk = db.Column(db.Integer, db.ForeignKey("calendars.id"), nullable = False)

  location = db.relationship("CoLocation", back_populates="company")

  def to_dict(self):
    return {
      "id": self.id,
      "companyName": self.companyName,
      "contactName": self.contactName,
      "contactPhone": self.contactPhone,
      "email": self.email,
      "userId": self.userId_fk,
      "calendarId": self.calendarId_fk,
      "location": {
          "companyId": self.location.id,
          "streetAddress1": self.location.streetAddress1,
          "streetAddress2": self.location.streetAddress2,
          "city": self.location.city,
          "state": self.location.state,
          "zip": self.location.zip,
      }
    }
