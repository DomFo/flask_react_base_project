from flask_cors import CORS
from flask_session import Session
from flask_login import LoginManager

cors = CORS()
server_session = Session()
login_manager = LoginManager()
