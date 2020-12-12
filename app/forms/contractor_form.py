from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def userTypeValid(form, field):
    print("Checking if user type is valid for contractor")
    validTypes = ["Dental Assistant", "Dental Hygenist", "Front Office", "Back Office", "Dentist"]
    print("field.data:", field.data)
    if field.data not in validTypes:
        raise ValidationError("Staff Type was incorrect")


class ContractorForm(FlaskForm):
    staffType = StringField('Contact Name', validators=[DataRequired(),
        userTypeValid])
