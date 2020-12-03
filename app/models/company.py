from .db import db
from sqlalchemy import DateTime, func
from .user import User
from .calendar import Calendar

class Company(db.Model):
  __tablename__ = 'companies'

  id = db.Column(db.Integer, primary_key = True)
  companyName = db.Column(db.String(100), nullable = False)
  contactName = db.Column(db.String(100), nullable = False)
  contactPhone = db.Column(db.String(12), nullable = False)
  email = db.Column(db.String(100), nullable = True)
  userId_fk = db.Column(db.Integer, db.ForeignKey(User.id), nullable = False)
  calendarId_fk = db.Column(db.Integer, db.ForeignKey(Calendar.id), nullable = False)

  placements = db.relationship("Placement", back_populates="companies", cascade="all, delete-orphan")
  users = db.relationship("User", back_populates="companies", cascade="all, delete-orphan")
  calendars = db.relationship("Calendar", back_populates="companies", cascade="all, delete-orphan")
  location = db.relationship("CoLocation", back_populates="company", cascade="all, delete-orphan")

  @property
  def companyName(self):
    return self.companyName

  @companyName.setter
  def companyName(self, companyName):
    self.companyName = companyName

  @property
  def contactName(self):
      return self.contactName

  @contactName.setter
  def contactName(self, contactName):
      self.contrLocationId = contactName

  @property
  def contactPhone(self):
      return self.contactPhone

  @contactPhone.setter
  def contactPhone(self, contactPhone):
      self.contactPhone = contactPhone

  @property
  def email(self):
      return self.email

  @email.setter
  def email(self, email):
      self.email = email

  @property
  def userId_fk(self):
      return self.userId_fk

  @userId_fk.setter
  def userId_fk(self, userId_fk):
      self.userId_fk = userId_fk

  @property
  def calendarId_fk(self):
      return self.calendarId_fk

  @calendarId_fk.setter
  def calendarId_fk(self, calendarId_fk):
      self.calendarId_fk = calendarId_fk

  def to_dict(self):
    return {
      "id": self.id,
      "companyName": self.companyName,
      "contactName": self.contactName,
      "contactPhone": self.contactPhone,
      "email": self.email,
      "user": {
          "username": self.users.username,
          "email": self.users.email,
          "user_type": self.users.user_type
      },
      "calendar": {
          "datesAvail": self.calendars.datesAvail,
          "datesBlocked": self.calendars.datesBlocked
      },
      "placement": {
           "id": self.placements.id,
           "startDate": self.placements.startDate,
           "endDate": self.placements.endDate,
           "completed": self.placements.completed
      },
      "location": {
          "companyId": self.location.id,
          "streetAddress1": self.location.streetAddress1,
          "streetAddress2": self.location.streetAddress2,
          "city": self.location.city,
          "state": self.location.state,
          "zip": self.location.zip,
      }
    }
