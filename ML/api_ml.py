import sys
from flask import Flask, request, jsonify
import traceback
import pandas as pd
import joblib
import numpy as np
import sklearn
from flask_cors import CORS  # Import the CORS module

# Import the models dictionary from models.py
from models import models

# Your API definition
app = Flask(__name__)
CORS(app)  # This enables CORS for the entire app

@app.route('/predict', methods=['POST'])
def predict():
    try:
        json_ = request.json
        print(json_)

        # Extract the input parameters from the JSON data
        month = json_['month']
        day_of_week = json_['day_of_week']
        hour = json_['hour']
        taxi_locationID = json_['taxi_locationID']
        passengers = json_['passengers']
        temp_avg = json_['temp_avg']
        precipitation = json_['precipitation']

        # Load the corresponding model based on the taxi_locationID
        model = models[taxi_locationID]

        # Create a new DataFrame with the input data for prediction
        new_data = pd.DataFrame({
            'month': [month],
            'day_of_week': [day_of_week],
            'hour': [hour],
            'taxi_locationID': [taxi_locationID],
            'passengers': [passengers],
            'temp_avg': [temp_avg],
            'precipitation': [precipitation]
        })

        # Use the loaded model to make predictions
        predictions = model.predict(new_data)

        # Round the prediction to the nearest whole number
        prediction = round(predictions[0])
        
        # If prediction is greater than 100, set it to 100
        if prediction > 100:
            prediction = 100

        return jsonify({'prediction': prediction})

    except:
        return jsonify({'trace': traceback.format_exc()})

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])  # This is for a command-line input
    except:
        port = 12345  # If you don't provide any port, the port will be set to 12345

    print('Models loaded')
    app.run(port=port, debug=True)