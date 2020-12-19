from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import BlockedDate


class BlockedDateForm(FlaskForm):
    blocked = StringField('blocked date', validators=[DataRequired()])
