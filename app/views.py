from app import app

# This is a temporary route so that you can verify the server launches successfully.
@app.route('/')
def home():
    return "<h1>HappyTummy Backend Server is securely running!</h1>"
