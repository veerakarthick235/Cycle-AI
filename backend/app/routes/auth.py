from flask import Blueprint, request, jsonify
from app.extensions import db, bcrypt
from app.models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/v1/auth/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    # Check if user exists
    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"status": "error", "message": "User already exists"}), 400

    # Hash password
    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

    # Save user
    user = User(email=email)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "User registered successfully"
    }), 201