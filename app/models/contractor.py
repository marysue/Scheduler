from .db import db
from sqlalchemy import DateTime, func, Enum
from .contrLocation import ContrLocation
from .user import User
from .calendar import Calendar

class Contractor(db.Model):
  __tablename__ = 'contractors'

  id = db.Column(db.Integer, primary_key = True)
  # Until I can figure out how to drop this enum in db downgrade I cannot use it
  # staff_type = db.Column(db.Enum("dentist", "dentalHygenist", "dentalAssistant", "frontOfficeStaff", "backOfficeStaff", name="staff_type"), nullable = False)
  staff_type = db.Column(db.Integer, nullable=False)
  assigned = db.Column(db.Boolean, default=False, nullable=False)
  contrLocationId_fk = db.Column(db.Integer, db.ForeignKey(ContrLocation.id), nullable = False)
  userid_fk = db.Column(db.Integer, db.ForeignKey(User.id), nullable = False)
  calendarId_fk = db.Column(db.Integer, db.ForeignKey(Calendar.id), nullable = False)

  contrLocation = db.relationship("ContrLocation", back_populates="contractors", cascade="all, delete-orphan")
  calendar = db.relationship("Calendar", back_populates="contractors", cascade="all, delete-orphan")
  user = db.relationship("User", back_populates="contractors", cascade="all, delete-orphan")
  placements = db.relationship("Placement", back_populates="contractor", cascade="all, delete-orphan")

  @property
  def staff_type(self):
    return self.staff_type

  @staff_type.setter
  def staff_type(self, staff_type):
    self.staff_type = staff_type

  @property
  def contrLocationId_fk(self):
      return self.contrLocationId_fk

  @contrLocationId_fk.setter
  def contrLocationId_fk(self, cl_id):
      self.contrLocationId = cl_id

  @property
  def userid_fk(self):
      return self.userid_fk

  @userid_fk.setter
  def userid_fk(self, uid):
      self.userid_fk = uid

  @property
  def calendarId_fk(self):
      return self.calendarId_fk

  @calendarId_fk.setter
  def calendarId_fk(self, cid):
      self.calendarId_fk = cid

  def to_dict(self):
    return {
      "id": self.id,
      "staff_type": self.staff_type,
      "contrLocation": {
          "streetAddress1": self.contrLocation.streetAddress1,
          "streetAddress2": self.contrLocation.streetAddress2,
          "city": self.contrLocation.city,
          "state": self.contrLocation.state,
          "zip": self.contrLocation.zip
          },
      "user": {
          "username": self.users.username,
          "email": self.users.email,
          "user_type": self.users.user_type
      },
      "calendar": {
          "datesAvail": self.calendars.datesAvail,
          "datesBlocked": self.calendars.datesBlocked
      }
    }
