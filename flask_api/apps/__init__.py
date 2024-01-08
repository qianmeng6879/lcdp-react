import flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import DevConfig
from flask_migrate import Migrate

app: flask.Flask

db = SQLAlchemy()


def create_app():
    global app
    app = flask.Flask(__name__)
    app.config.from_object(DevConfig)
    CORS(app)
    db.init_app(app)
    Migrate(app, db)
    from .home import home as home_bp
    app.register_blueprint(home_bp)

    return app
