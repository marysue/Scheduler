from .db import db
from sqlalchemy import DateTime, func


class CompanyContact(db.Model):
  __tablename__ = 'companyContacts'

  id = db.Column(db.Integer, primary_key=True)
  companyId_fk = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable = True)
  companyName = db.Column(db.String, nullable = False)
  name = db.Column(db.String(50), nullable = False)
  phone = db.Column(db.String(12), nullable = False)
  email = db.Column(db.String(100), nullable = False)
  addr1 = db.Column(db.String(100), nullable = True)
  addr2 = db.Column(db.String(100), nullable = True)
  city = db.Column(db.String(50), nullable = True)
  state = db.Column(db.String(2), nullable = True)
  zip = db.Column(db.String(10), nullable = True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  company = db.relationship("Company", back_populates=("companyContact"))
  placements = db.relationship("Placement", back_populates=("companyContact"))

  def to_dict(self):
    return {
      "id": self.id,
      "companyId": self.company.id,
      "companyName": self.companyName,
      "name": self.name,
      "phone": self.phone,
      "email": self.email,
      "addr1": self.addr1,
      "addr2": self.addr2,
      "city": self.city,
      "state": self.state,
      "zip": self.zip,

    }
