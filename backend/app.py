from flask import Flask, request, Response, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from transformers import AutoTokenizer, AutoModelForCausalLM
import time

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

# Load the Hugging Face model and tokenizer
model_name = "samhitmantrala/che2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return Response("All fields are required", status=400)

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return Response("User already exists", status=400)

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = {"username": username, "email": email, "password": hashed_password}
    users_collection.insert_one(user_data)
    
    return Response("User registered successfully", status=201)

@app.route('/api/auth/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return Response("Email and password are required", status=400)

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return Response("Invalid email or password", status=401)

    session['email'] = email  # Store user's email in session for sign-in
    return Response(f"Signed in successfully, user: {user['username']}", status=200)

@app.route('/api/auth/signout', methods=['POST'])
def sign_out():
    try:
        session.pop('email', None)  # Clear the session data
        return Response("Successfully signed out", status=200)
    except Exception as e:
        return Response(str(e), status=500)

@app.route('/geninfo', methods=['POST'])
def geninfo():
    user_message = request.json['message']
    
    def generate_text_stream(user_message):
        input_ids = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors='pt')
        attention_mask = (input_ids != tokenizer.pad_token_id).long()
        
        response_ids = model.generate(
            input_ids,
            max_length=150,
            num_return_sequences=1,
            attention_mask=attention_mask,
            pad_token_id=tokenizer.eos_token_id
        )
        
        response_text = tokenizer.decode(response_ids[0], skip_special_tokens=True)

        # Streaming each character with a delay
        for char in response_text:
            yield char
            time.sleep(0.05)  # 0.05 seconds delay

    return Response(generate_text_stream(user_message), content_type='text/plain;charset=utf-8')

if __name__ == '__main__':
    app.run(debug=True)
