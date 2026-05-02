def register_blueprints(app):
    from .auth import auth_bp
    app.register_blueprint(auth_bp)