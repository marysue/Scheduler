from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import DateTime, func, Enum


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  # user_type = db.Column(db.Enum("admin", "contractor", "company", name="user_types"), nullable = False)
  # until I can figure out how to drop the enum in flask db downgrade, I cannot use it
  user_type = db.Column(db.Integer, nullable = False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now())

  contractors = db.relationship("Contractor", back_populates="user", cascade="all, delete-orphan")
  companies = db.relationship("Company", back_populates="users", cascade="all, delete-orphan")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "user_type": self.user_type
    }
