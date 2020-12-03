from .db import db
from sqlalchemy import DateTime, func

class Calendar(db.Model):
  __tablename__ = 'calendars'

  id = db.Column(db.Integer, primary_key=True)
  datesAvail = db.Column(db.DateTime, nullable=True)
  datesBlocked = db.Column(db.DateTime, nullable=True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  def to_dict(self):
    return {
      "id": self.id,
      "datesAvail": self.datesAvail,
      "datesBlocked": self.datesBlocked,
    }
