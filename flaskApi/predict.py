from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load the Logistic Regression model from the .pkl file
model = pickle.load(open("LogisticRegression.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    # Get the inputs from the form
    N = float(request.json.get("N"))
    P = float(request.json.get("P"))
    K = float(request.json.get("K"))
    temperature = float(request.json.get("temperature"))
    humidity = float(request.json.get("humidity"))
    ph = float(request.json.get("ph"))
    rainfall = float(request.json.get("rainfall"))
    
    # Use the model to make a prediction
    prediction = model.predict([[N, P, K, temperature, humidity, ph, rainfall]])
    
    # Return the prediction as a JSON response
    return jsonify({"prediction": prediction[0]})

if __name__ == "__main__":
    app.run(debug=True)
