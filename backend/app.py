from flask import Flask
from config import Config
from routes.api import api

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def home():
    return "AI Branch Manager Backend is Running!"

if __name__ == '__main__':
    app.run(debug=True)