import os

class Config:
    # A generic secret key for managing user sessions securely
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-happytummy-key-123'
    
    # Database Settings : Configured for local MySQL
    DB_HOST = os.environ.get('DB_HOST') or '127.0.0.1' 
    DB_USER = os.environ.get('DB_USER') or 'root'
    DB_PASSWORD = os.environ.get('DB_PASSWORD') or 'Kamukumpallil1234'
    DB_NAME = os.environ.get('DB_NAME') or 'FOOD_DELIVERY'
