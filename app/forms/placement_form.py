from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Placement


class PlacementForm(FlaskForm):
    contractorId = IntegerField('Contractor Id', validators=[DataRequired()])
    companyContactId = IntegerField('Company Contact Id', validators=[DataRequired()])
    startDate = StringField('Start Date', validators=[DataRequired()])
    endDate = StringField('End Date', validators=[DataRequired()])
