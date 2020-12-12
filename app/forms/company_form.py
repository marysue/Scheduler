from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CompanyForm(FlaskForm):
    companyName = StringField('Company Name', validators=[DataRequired()])
