from flask import Flask, request, jsonify, session, Response, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from transformers import RagTokenizer, RagRetriever, RagSequenceForGeneration
from datasets import load_dataset
import os
import time
import fitz  # PyMuPDF
import faiss
import numpy as np

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

def setup_llama_index(dataset):
    embeddings = np.array([item['embedding'] for item in dataset]).astype('float32')
    index = faiss.IndexFlatIP(embeddings.shape[1])  # Assuming embeddings are of the same dimension
    index.add(embeddings)
    return index

def load_rag_model_and_tokenizer():
    tokenizer = RagTokenizer.from_pretrained("facebook/rag-sequence-nq")
    dataset = load_dataset("wiki_dpr", split="train[:1%]")  # Using a small subset for testing
    llama_index = setup_llama_index(dataset)
    
    retriever = RagRetriever(
        rag_model="facebook/rag-sequence-nq",
        index=llama_index,
        tokenizer=tokenizer,
        use_dummy_dataset=False  # Adjust as per your dataset needs
    )

    model = RagSequenceForGeneration.from_pretrained(
        "facebook/rag-sequence-nq",
        retriever=retriever
    )

    return tokenizer, model, retriever

# Load the RAG model and tokenizer
rag_tokenizer, rag_model, rag_retriever = load_rag_model_and_tokenizer()

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

def generate_text_stream(user_message, tokenizer, model):
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

@app.route('/generate_response', methods=['POST'])
def generate_response():
    user_message = request.json['message']
    category = request.json['category']
    
    if category not in ["sports", "cultural", "technical", "placements"]:
        return jsonify({"success": False, "message": "Invalid category"}), 400
    
    # Assuming your PDFs are stored in backend/pdf folder
    pdf_folder = 'backend/pdf'
    pdf_file = os.path.join(pdf_folder, f"{category}.pdf")
    
    if not os.path.exists(pdf_file):
        return jsonify({"success": False, "message": "PDF file not found"}), 404
    
    pdf_text = extract_text_from_pdf(pdf_file)
    
    # Process text with RAG model
    return Response(generate_text_stream(user_message, rag_tokenizer, rag_model), content_type='text/plain;charset=utf-8')

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

@app.route('/')
def serve():
    return send_from_directory('client', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('client', path)

if __name__ == '__main__':
    app.run(debug=True)
