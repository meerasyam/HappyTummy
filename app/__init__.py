from flask import Flask

# Initialize Flask app pointing to the root structure folders natively
app = Flask(__name__, template_folder='../templates', static_folder='../static')

# Load config.py
app.config.from_object('config.Config')

from app import views
