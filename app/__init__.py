from flask import Flask

# Initialize Flask app
app = Flask(__name__)

# Load config.py
app.config.from_object('config.Config')

from app import views
