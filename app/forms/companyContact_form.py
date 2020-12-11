from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from app.models import CompanyContact


class CompanyContactForm(FlaskForm):
    companyName = StringField('Company Name', validators=[DataRequired()])
    name = StringField('Contact Name', validators=[DataRequired()])
    phone = StringField('Contact Phone', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    addr1 = StringField('Address 1', validators=[DataRequired()])
    addr2 = StringField('Address 2')
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zip = StringField('Zip Code', validators=[DataRequired()])
