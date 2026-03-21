import os

class Config:
    # A generic secret key for managing user sessions securely
    SECRET_KEY = os.environ.get('super-secret-happytummy-key-123')
    
    # Database Settings : Configured for local MySQL
    DB_HOST = os.environ.get('127.0.0.1') 
    DB_USER = os.environ.get('root')
    DB_PASSWORD = os.environ.get('Kamukumpallil1234')
    DB_NAME = os.environ.get('FOOD_DELIVERY')
