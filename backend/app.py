from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# Replace with your MongoDB URI and database setup
MONGO_URI = 'mongodb+srv://samhitmantrala8:PrProject@cluster0.k63kxvp.mongodb.net/prproject?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(MONGO_URI)
db = client['mydatabase']
users_collection = db['users']

# Ensure app.secret_key is set for session management
app.secret_key = '1a2b3c4d5e6f'  # Change this to a secure secret key

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"success": False, "message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = {"username": username, "email": email, "password": hashed_password}
    users_collection.insert_one(user_data)
    
    return jsonify({"success": True, "message": "User registered successfully"}), 201

@app.route('/api/auth/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    session['email'] = email  # Store user's email in session for sign-in
    return jsonify({"success": True, "message": "Signed in successfully", "user": {"username": user['username'], "email": user['email']}}), 200

@app.route('/api/auth/signout', methods=['POST'])
def sign_out():
    try:
        session.pop('email', None)  # Clear the session data
        return jsonify({'success': True, 'message': 'Successfully signed out'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
