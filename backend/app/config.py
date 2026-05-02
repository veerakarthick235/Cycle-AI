"""CycleAI — Configuration classes.

Three tiers: Development, Testing, Production.
All secrets loaded from environment variables.
"""
import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class BaseConfig:
    """Shared configuration across all environments."""
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

    # ── SQLAlchemy ────────────────────────────────────────────
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ── JWT ───────────────────────────────────────────────────
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-dev-secret")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", "900"))
    )
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(
        seconds=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES", "604800"))
    )
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # ── Bcrypt ────────────────────────────────────────────────
    BCRYPT_LOG_ROUNDS = 12

    # ── Fernet encryption for sensitive health data ──────────
    FERNET_KEY = os.getenv("FERNET_KEY", "")

    # ── Mail ──────────────────────────────────────────────────
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "true").lower() == "true"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER",
                                     "CycleAI <noreply@cycleai.app>")

    # ── Stripe ────────────────────────────────────────────────
    STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
    STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY", "")
    STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    STRIPE_PREMIUM_MONTHLY_PRICE_ID = os.getenv(
        "STRIPE_PREMIUM_MONTHLY_PRICE_ID", ""
    )
    STRIPE_PREMIUM_ANNUAL_PRICE_ID = os.getenv(
        "STRIPE_PREMIUM_ANNUAL_PRICE_ID", ""
    )

    # ── Redis / Celery ───────────────────────────────────────
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL",
                                   "redis://localhost:6379/1")
    CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND",
                                       "redis://localhost:6379/2")

    # ── Rate Limiting ────────────────────────────────────────
    RATELIMIT_STORAGE_URI = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    RATELIMIT_DEFAULT = "200/hour"

    # ── Sentry ───────────────────────────────────────────────
    SENTRY_DSN_BACKEND = os.getenv("SENTRY_DSN_BACKEND", "")


class DevelopmentConfig(BaseConfig):
    """Development-specific settings."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL_LOCAL",
        os.getenv("DATABASE_URL",
                   "postgresql://cycleai:cycleai_secret@localhost:5432/cycleai")
    )
    BCRYPT_LOG_ROUNDS = 4  # Faster hashing during dev


class TestingConfig(BaseConfig):
    """Testing-specific settings."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=5)
    BCRYPT_LOG_ROUNDS = 4
    RATELIMIT_ENABLED = False


class ProductionConfig(BaseConfig):
    """Production-specific settings."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    # Enforce HTTPS-only cookies in production
    JWT_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True


config_map = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
}
