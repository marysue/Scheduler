from .db import db
from sqlalchemy import DateTime, func


class ContractorContact(db.Model):
  __tablename__ = 'contractorContacts'

  id = db.Column(db.Integer, primary_key = True)
  contractorContactId_fk = db.Column(db.Integer, db.ForeignKey("contractors.id"), nullable = False)
  name = db.Column(db.String(50), nullable = False)
  phone = db.Column(db.String(12), nullable = True)
  email = db.Column(db.String(50), nullable = True)
  addr1 = db.Column(db.String(100), nullable = True)
  addr2 = db.Column(db.String(100), nullable = True)
  city = db.Column(db.String(50), nullable = True)
  state = db.Column(db.String(2), nullable = True)
  zip = db.Column(db.String(10), nullable = True)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractor = db.relationship("Contractor", back_populates=("contractorContact"))

  def to_dict(self):
    return {
      "id": self.id,
      "contractorId": self.contractorContactId_fk,
      "name": self.name,
      "phone": self.phone,
      "email": self.email,
      "addr1": self.addr1,
      "addr2": self.addr2,
      "city": self.city,
      "state": self.state,
      "zip": self.zip,
      "contractor": self.contractor.to_dict(),
    }
