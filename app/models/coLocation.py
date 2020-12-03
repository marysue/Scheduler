from .db import db
import enum as Enum
from .company import Company
from sqlalchemy import DateTime, func


class CoLocation(db.Model):
  __tablename__ = 'coLocations'

  id = db.Column(db.Integer, primary_key=True)
  companyId_fk = db.Column(db.Integer, db.ForeignKey(Company.id), nullable=True)
  streetAddress1 = db.Column(db.String(100), nullable=True)
  streetAddress2 = db.Column(db.String(100), nullable=True)
  city = db.Column(db.String(50), nullable=True)
  state = db.Column(db.String(2), nullable=True)
  zip = db.Column(db.String(10), nullable=True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  company = db.relationship("Company", back_populates=("location"),
                            cascade="all, delete-orphan")

  @property #getter
  def streetAddress1(self):
    return self.streetAddress1

  @streetAddress1.setter
  def address1(self, addr1):
      self.streetAddress1 = addr1

  @property
  def streetAddress2(self):
      return self.streetAddress2

  @streetAddress2.setter
  def streetAddress2(self, addr2):
      self.streetAddress2 = addr2

  @property
  def city(self):
      return self.city

  @city.setter
  def city(self, city):
      self.city = city

  @property
  def state(self):
      return self.state

  @state.setter
  def state(self, state):
      self.state = state

  @property
  def zip(self):
      return self.zip

  @zip.setter
  def zip(self, zip):
    self.zip = zip

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
