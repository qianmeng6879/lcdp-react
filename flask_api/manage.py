from apps import create_app, db
from apps.models import *
from flask_migrate import Migrate

app = create_app()

Migrate(app, db)
