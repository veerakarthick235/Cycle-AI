<![CDATA[<div align="center">

# 🌸 CycleAI

**Your cycle is unique. Your tracker should be too.**

AI-powered menstrual health platform with personalized predictions,
cycle health scoring, and privacy-first architecture.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000?logo=flask)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)](https://postgresql.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-pink)]()

</div>

---

## 📸 Screenshots

| Landing Page | Dashboard |
|:---:|:---:|
| ![Landing](docs/screenshots/landing.png) | ![Dashboard](docs/screenshots/dashboard.png) |

| Calendar | Analytics |
|:---:|:---:|
| ![Calendar](docs/screenshots/calendar.png) | ![Analytics](docs/screenshots/analytics.png) |

---

## ✨ Key Differentiators

| Feature | CycleAI | Clue / Flo |
|---------|---------|------------|
| ML adapts to YOUR irregular patterns | ✅ | ❌ Population averages |
| ARIMA time-series forecasting | ✅ | ❌ |
| Cycle Health Score (0–100) | ✅ | ❌ |
| Privacy-first, zero data brokers | ✅ | ❌ |
| Doctor-share portal with expiring tokens | ✅ | ❌ |
| Symptom correlation engine | ✅ | Partial |
| Full data export & delete (GDPR) | ✅ | Partial |

---

## 🏗️ Architecture

```
┌──────────────┐     ┌───────────────┐     ┌──────────────────────┐
│  React 18    │────▶│  Nginx        │────▶│  Flask 3.x           │
│  Vite 5      │     │  Reverse Proxy│     │  Gunicorn + gevent   │
│  Tailwind v3 │     └───────────────┘     ├──────────────────────┤
│  Chart.js 4  │                           │  Celery Worker       │
│  Framer Motion│                          │  (ML tasks + emails) │
│  Zustand     │                           ├──────────────────────┤
└──────────────┘                           │  Celery Beat         │
                                           │  (scheduled jobs)    │
                                           └──────┬───────┬───────┘
                                                  │       │
                                    ┌─────────────┘       └─────────────┐
                                    ▼                                   ▼
                             ┌──────────────┐                   ┌──────────────┐
                             │ PostgreSQL 15│                   │   Redis 7    │
                             │ (primary DB) │                   │ (cache/queue)│
                             └──────────────┘                   └──────────────┘
```

---

## 📂 Project Structure

```
cycleai/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # create_app() factory
│   │   ├── config.py            # Dev / Test / Production configs
│   │   ├── extensions.py        # SQLAlchemy, JWT, Bcrypt, Mail, Limiter
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Marshmallow validation schemas
│   │   ├── routes/              # API blueprint endpoints
│   │   ├── services/            # Business logic layer
│   │   ├── tasks/               # Celery async tasks
│   │   └── middleware/          # Auth guards, rate limiting
│   ├── migrations/              # Alembic migration files
│   ├── tests/                   # pytest test suite
│   ├── requirements.txt         # Python dependencies (pinned)
│   ├── Dockerfile.backend       # Multi-stage Python 3.11-slim
│   └── run.py                   # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/          # 12 reusable UI components
│   │   ├── pages/               # 10 route-level pages
│   │   ├── store/               # Zustand state stores
│   │   ├── utils/               # Helpers, constants, mock data
│   │   ├── styles/              # Global CSS + Tailwind
│   │   ├── App.jsx              # Router + providers
│   │   └── main.jsx             # React entry point
│   ├── tailwind.config.js       # Custom design tokens
│   ├── vite.config.js           # Vite + proxy + code splitting
│   ├── package.json
│   └── Dockerfile.frontend      # Multi-stage Node 20 → Nginx
├── ml/
│   ├── predictor.py             # ARIMA + GradientBoosting ensemble
│   ├── health_score.py          # Composite 0–100 score
│   ├── insights.py              # Pattern detection engine
│   ├── data_prep.py             # Feature engineering
│   └── models/                  # Serialized .joblib files
├── nginx/
│   └── nginx.conf               # Reverse proxy config
├── docker-compose.yml           # Dev profile (7 services)
├── docker-compose.prod.yml      # Production overrides
├── .env.example                 # Environment template
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Frontend build |
| Python | 3.11+ | Backend runtime |
| PostgreSQL | 15+ | Primary database |
| Redis | 7+ | Cache & task queue |
| Docker | 24+ | Containerization (optional) |

### Option 1: Docker Compose (Recommended)

```bash
# 1. Clone and enter the project
cd cycleai

# 2. Copy environment template
cp .env.example .env
# Edit .env with your Stripe keys, SMTP credentials, etc.

# 3. Launch all services
docker-compose up --build

# 4. Run database migrations
docker-compose exec backend flask db upgrade

# 5. Seed initial data (symptoms, demo user)
docker-compose exec backend flask seed
```

The app is now available at:
- **Frontend**: http://localhost:80 (via Nginx)
- **Backend API**: http://localhost:5000/api/v1/health
- **Direct frontend dev**: http://localhost:3000

### Option 2: Run Services Individually

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set environment variables
set FLASK_APP=run.py
set FLASK_ENV=development
set DATABASE_URL=postgresql://cycleai:cycleai_secret@localhost:5432/cycleai
set REDIS_URL=redis://localhost:6379/0

# Run database migrations
flask db upgrade

# Seed initial data
flask seed

# Start the development server
flask run --port 5000
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (proxies API to localhost:5000)
npm run dev
```

Frontend is now at **http://localhost:5173**

#### Celery Worker (for async ML & emails)

```bash
cd backend
celery -A app.tasks.celery_app.celery worker --loglevel=info
```

#### Celery Beat (for scheduled reminders)

```bash
cd backend
celery -A app.tasks.celery_app.celery beat --loglevel=info
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | ✅ | Flask secret key (64+ random chars) |
| `JWT_SECRET_KEY` | ✅ | JWT signing key (64+ random chars) |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `REDIS_URL` | ✅ | Redis connection string |
| `FERNET_KEY` | ✅ | Encryption key for health data at rest |
| `FRONTEND_URL` | ✅ | Frontend origin for CORS (e.g. `http://localhost:5173`) |
| `STRIPE_SECRET_KEY` | ⚠️ | Stripe API secret key |
| `STRIPE_PUBLISHABLE_KEY` | ⚠️ | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ | Stripe webhook signing secret |
| `STRIPE_PREMIUM_MONTHLY_PRICE_ID` | ⚠️ | Stripe Price ID for $9.99/mo |
| `STRIPE_PREMIUM_ANNUAL_PRICE_ID` | ⚠️ | Stripe Price ID for $79.99/yr |
| `MAIL_SERVER` | ⚠️ | SMTP server hostname |
| `MAIL_PORT` | ⚠️ | SMTP port (587 for TLS) |
| `MAIL_USERNAME` | ⚠️ | SMTP username |
| `MAIL_PASSWORD` | ⚠️ | SMTP password / app password |
| `SENTRY_DSN_BACKEND` | Optional | Sentry DSN for error monitoring |
| `SENTRY_DSN_FRONTEND` | Optional | Sentry DSN for frontend |

> ✅ = Required for app to run | ⚠️ = Required for that feature | Optional = Nice to have

Generate a Fernet key:
```python
from cryptography.fernet import Fernet
print(Fernet.generate_key().decode())
```

---

## 📡 API Reference

All routes prefixed with `/api/v1/`. Response format:
```json
{ "status": "success|error", "data": {}, "message": "" }
```

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | — | Create account |
| POST | `/auth/login` | — | Get access + refresh tokens |
| POST | `/auth/refresh` | Refresh | Refresh access token |
| POST | `/auth/logout` | Bearer | Blacklist refresh token |
| POST | `/auth/forgot-password` | — | Send reset email |
| POST | `/auth/reset-password` | — | Verify token + update pw |
| DELETE | `/auth/account` | Bearer | GDPR: full data deletion |

### Onboarding
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/onboarding/status` | Bearer | Check onboarding state |
| POST | `/onboarding/complete` | Bearer | Save DOB, cycle length, etc. |

### Cycles
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cycles/` | Bearer | Paginated list (date range filter) |
| POST | `/cycles/` | Bearer | Log new cycle start |
| PATCH | `/cycles/:id` | Bearer | Update (end_date, flow, etc.) |
| DELETE | `/cycles/:id` | Bearer | Remove cycle entry |
| GET | `/cycles/summary` | Bearer | Stats: avg, shortest, longest |

### Daily Logs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/logs/` | Bearer | Range query (`?start=&end=`) |
| POST | `/logs/` | Bearer | Create or upsert daily log |
| GET | `/logs/:date` | Bearer | Single day log |
| PATCH | `/logs/:date` | Bearer | Update log fields |
| GET | `/logs/symptoms/all` | Bearer | Full symptom catalog |

### Predictions
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/predictions/latest` | Bearer | Latest prediction |
| POST | `/predictions/generate` | Bearer | Trigger new prediction |
| GET | `/predictions/history` | Bearer | Historical predictions |

### Analytics (Premium)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/analytics/cycle-lengths` | Bearer | Cycle length trend data |
| GET | `/analytics/symptoms` | Bearer | Symptom frequency heatmap |
| GET | `/analytics/mood-energy` | Bearer | Mood/energy by phase |
| GET | `/analytics/health-score` | Bearer | Health score history |

### Subscriptions
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/subscriptions/checkout` | Bearer | Create Stripe Checkout |
| POST | `/subscriptions/portal` | Bearer | Stripe billing portal |
| GET | `/subscriptions/status` | Bearer | Current plan + limits |
| POST | `/webhooks/stripe` | — | Stripe webhook handler |

### Doctor Sharing
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/doctor/token/create` | Bearer | Generate expiring token |
| GET | `/doctor/token/list` | Bearer | User's active tokens |
| DELETE | `/doctor/token/:id` | Bearer | Revoke token |
| GET | `/doctor/view/:token` | — | Public doctor view |

### Reports
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/reports/export/pdf` | Bearer | Generate cycle PDF |
| GET | `/reports/export/json` | Bearer | Full GDPR data export |

---

## 🧠 ML Module

### Prediction Pipeline

```
Cycle History → Feature Engineering → Model Selection → Prediction
                                          │
                    ┌─────────────────────┼──────────────────────┐
                    │                     │                      │
              n_cycles < 3         3 ≤ n < 6              n_cycles ≥ 6
                    │                     │                      │
            Moving Average      Linear Regression     ARIMA + GradientBoosting
                                                        (0.6 / 0.4 ensemble)
```

### Engineered Features
- `rolling_mean_3` — 3-cycle moving average
- `rolling_std_3` — irregularity proxy
- `trend` — linear slope of recent cycles
- `season_month` — cyclical encoding (sin/cos)
- `avg_pain_pre` — avg pain 3 days pre-period
- `avg_mood` — avg mood in previous cycle
- `user_age_years` — computed from DOB

### Cycle Health Score (0–100)

| Weight | Factor | Calculation |
|--------|--------|-------------|
| 30% | Cycle regularity | `1 / (1 + std_dev)` |
| 20% | Cycle length norm | Closeness to 21–35 day range |
| 15% | Pain trend | Lower is better |
| 20% | Mood/energy avg | Scale 1–10 |
| 15% | Sleep consistency | `std_dev` of `sleep_hours` |

| Score | Label |
|-------|-------|
| 90–100 | Excellent |
| 70–89 | Good |
| 50–69 | Fair |
| 30–49 | Needs Care |
| 0–29 | Consult a Doctor |

### Model Retraining
Models auto-retrain via Celery after a user logs 3+ new cycles. Trigger manually:
```bash
flask ml-retrain --user-id <UUID>
```

---

## 💳 Stripe Integration

### Plans
| Plan | Price | Stripe Env Var |
|------|-------|----------------|
| Free | $0 | — |
| Premium | $9.99/mo | `STRIPE_PREMIUM_MONTHLY_PRICE_ID` |
| Annual | $79.99/yr | `STRIPE_PREMIUM_ANNUAL_PRICE_ID` |

### Webhook Events Handled
- `checkout.session.completed` → Activate subscription
- `invoice.paid` → Extend billing period
- `invoice.payment_failed` → Set `past_due` status
- `customer.subscription.deleted` → Downgrade to free

### Local Webhook Testing
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:5000/api/v1/webhooks/stripe
```

### Feature Gating
- Free: 3-month history, no analytics, no doctor sharing
- Premium/Annual: Unlimited history, full analytics, doctor sharing, PDF reports
- Exceeded limits return `402` with `{ "upgrade_url": "/subscription" }`

---

## 🗄️ Database

### Migration Commands

```bash
# Create a new migration
flask db migrate -m "description of changes"

# Apply migrations
flask db upgrade

# Rollback one step
flask db downgrade

# Show migration history
flask db history
```

### Schema Overview

| Table | Description |
|-------|-------------|
| `users` | Accounts with soft delete (GDPR) |
| `cycles` | Period start/end, flow, length |
| `daily_logs` | Mood, energy, pain, sleep, temp |
| `symptoms` | Symptom catalog (seeded) |
| `daily_log_symptoms` | Junction table with severity |
| `predictions` | ML outputs with confidence |
| `subscriptions` | Stripe billing state |
| `doctor_access_tokens` | Expiring share tokens |

### Backup (Production)

```bash
# Manual backup
docker-compose exec db pg_dump -U cycleai cycleai > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T db psql -U cycleai cycleai < backup_20260501.sql
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
python -m pytest tests/ -v --tb=short

# With coverage
python -m pytest tests/ --cov=app --cov-report=html
```

### Frontend Build Validation

```bash
cd frontend
npm run build   # Ensures no compilation errors
```

---

## 🚢 Production Deployment

### Pre-deployment Checklist

- [ ] Set `FLASK_ENV=production` in `.env`
- [ ] Generate strong `SECRET_KEY` and `JWT_SECRET_KEY` (64+ chars)
- [ ] Generate `FERNET_KEY` for health data encryption
- [ ] Configure real SMTP credentials
- [ ] Set Stripe live keys (`sk_live_...`, `pk_live_...`)
- [ ] Configure Stripe webhooks pointing to your domain
- [ ] Set `FRONTEND_URL` to your production domain
- [ ] Set up Sentry DSN for error monitoring
- [ ] Configure SSL/TLS certificates in Nginx
- [ ] Set up automated database backups
- [ ] Review rate limiting configuration

### Deploy with Docker

```bash
# Build and start with production overrides
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Run migrations
docker-compose exec backend flask db upgrade

# Seed data (first time only)
docker-compose exec backend flask seed

# Check service health
docker-compose ps
```

---

## 🎨 Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `pink-500` | `#FF6F91` | Primary brand |
| `purple-500` | `#9D4EDD` | Secondary / gradients |
| `teal-400` | `#4ECDC4` | Fertility accent |
| `amber-400` | `#FFB347` | Ovulation accent |
| `red-400` | `#FF6B6B` | Period accent |

### Typography
| Role | Font | Source |
|------|------|--------|
| Display / Headings | Playfair Display | Google Fonts |
| Body / UI | DM Sans | Google Fonts |
| Monospace / Data | JetBrains Mono | Google Fonts |

### Components
12 reusable components in `src/components/`:

| Component | Description |
|-----------|-------------|
| `PhaseChip` | Cycle phase indicator with icon |
| `HealthScoreGauge` | Canvas arc gauge (0–100) |
| `InsightCard` | AI insight with type-based color |
| `StatCard` | Metric card with trend arrow |
| `PredictionCard` | Next period + confidence bar |
| `PlanCard` | Subscription tier card |
| `SymptomSelector` | Category-grouped toggle chips |
| `FlowPicker` | Flow intensity emoji buttons |
| `LogDrawer` | Slide-up daily log form |
| `Navbar` | Glassmorphism nav + mobile menu |
| `Footer` | Links + branding |
| `ProtectedRoute` | Auth guard wrapper |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow existing code patterns and conventions
4. Write tests for new backend endpoints
5. Ensure `npm run build` passes with no errors
6. Ensure `pytest` passes with no failures
7. Submit a pull request with a clear description

### Code Conventions
- **Backend**: Flask blueprints, Marshmallow validation, structured JSON responses
- **Frontend**: Functional components, Zustand stores, Tailwind utility classes
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

Made with 💗 for women's health

**[CycleAI](https://cycleai.app)** · Your cycle is unique. Your tracker should be too.

</div>
]]>
