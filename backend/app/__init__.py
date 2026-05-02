"""
CycleAI — Flask application factory.

Uses the application factory pattern to avoid circular imports and
support multiple configurations (dev, test, prod).
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS

from app.config import config_map
from app.extensions import db, migrate, jwt, bcrypt, mail, limiter


def create_app(config_name: str | None = None) -> Flask:
    """Create and configure the Flask application."""

    # 🔑 Load models so Flask-Migrate can detect them
    from app.models import User  # IMPORTANT

    # ── Config selection ─────────────────────────────────────
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    app = Flask(__name__)
    app.config.from_object(config_map[config_name])

    # ── Initialize extensions ────────────────────────────────
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    limiter.init_app(app)

    # ── CORS ────────────────────────────────────────────────
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config.get("FRONTEND_URL", "*")}},
        supports_credentials=True,
    )

    # ── Register blueprints ─────────────────────────────────
    try:
        from app.routes import register_blueprints
        register_blueprints(app)
    except Exception:
        # Safe fallback if routes not implemented yet
        pass

    # ── Health check ────────────────────────────────────────
    @app.route("/api/v1/health")
    def health_check():
        return jsonify({
            "status": "success",
            "message": "CycleAI API is running",
            "data": None
        })

    # ── JWT error handlers ──────────────────────────────────
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "status": "error",
            "message": "Access token has expired",
            "data": None
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error_string):
        return jsonify({
            "status": "error",
            "message": f"Invalid token: {error_string}",
            "data": None
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error_string):
        return jsonify({
            "status": "error",
            "message": "Authorization token is missing",
            "data": None
        }), 401

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return jsonify({
            "status": "error",
            "message": "Token has been revoked",
            "data": None
        }), 401

    # ── Global error handlers ───────────────────────────────
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({
            "status": "error",
            "message": "Resource not found",
            "data": None
        }), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({
            "status": "error",
            "message": "Internal server error",
            "data": None
        }), 500

    @app.errorhandler(429)
    def rate_limit_exceeded(e):
        return jsonify({
            "status": "error",
            "message": "Rate limit exceeded. Please try again later.",
            "data": None
        }), 429

    # ── Sentry integration (optional) ───────────────────────
    sentry_dsn = app.config.get("SENTRY_DSN_BACKEND")
    if sentry_dsn:
        import sentry_sdk
        from sentry_sdk.integrations.flask import FlaskIntegration

        sentry_sdk.init(
            dsn=sentry_dsn,
            integrations=[FlaskIntegration()],
            traces_sample_rate=0.2,
        )

    # ── CLI command: seed database ──────────────────────────
    @app.cli.command("seed")
    def seed_database():
        """Seed the database with default data."""
        try:
            from app.services.seed_service import run_seeds
            run_seeds()
            print("Database seeded successfully.")
        except Exception:
            print("Seed service not implemented yet.")

    return app