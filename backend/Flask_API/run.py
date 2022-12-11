import numpy as np
import model

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'hello!!'

@app.route('/predict', methods=['POST'])

def postInput():
    # 取前端傳來的數值


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 3000, debug = True)