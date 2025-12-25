from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return "Flask backend is running"

@app.route("/process-form", methods=["POST"])
def process_form():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    age = data.get("age")
    message = data.get("message")

    result = {
        "status": "success",
        "received": {
            "name": name,
            "email": email,
            "age": age,
            "message": message
        }
    }
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
