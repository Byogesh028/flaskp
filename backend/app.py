from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/process-form", methods=["POST"])
def process_form():
    data = request.get_json()  # expecting JSON from frontend
    # or request.form if you post as form-encoded
    name = data.get("name")
    email = data.get("email")
    age = data.get("age")
    message = data.get("message")

    # Process the data as needed (store, validate, etc.)
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
