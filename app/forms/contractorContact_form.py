from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ContractorContactForm(FlaskForm):
    name = StringField('Contact Name', validators=[DataRequired()])
    phone = StringField('Contact Phone', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    addr1 = StringField('Address 1', validators=[DataRequired()])
    addr2 = StringField('Address 2')
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zip = StringField('Zip Code', validators=[DataRequired()])
