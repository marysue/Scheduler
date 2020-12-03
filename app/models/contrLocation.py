from .db import db
import enum as Enum
from sqlalchemy import DateTime, func


class ContrLocation(db.Model):
  __tablename__ = 'contrLocations'

  id = db.Column(db.Integer, primary_key = True)
  streetAddress1 = db.Column(db.String(100), nullable=True)
  streetAddress2 = db.Column(db.String(100), nullable=True)
  city = db.Column(db.String(50), nullable=True)
  state = db.Column(db.String(2), nullable = True)
  zip = db.Column(db.String(10), nullable = True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractors = db.relationship("Contractor", back_populates=("contrLocation"), cascade="all, delete-orphan")

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
      "zip": self.zip
    }
