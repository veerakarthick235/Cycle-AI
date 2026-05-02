import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, Shield, Calendar, BarChart3, Share2, Sparkles,
  ChevronDown, ArrowRight, Star, Zap, Heart, Lock
} from "lucide-react";
import PlanCard from "@/components/PlanCard";
import { SUBSCRIPTION_PLANS } from "@/utils/constants";
import Footer from "@/components/Footer";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const features = [
  { icon: Brain, title: "AI-Powered Predictions", desc: "ML models that adapt to YOUR irregular patterns, not population averages." },
  { icon: Shield, title: "Privacy First", desc: "Zero third-party data brokers. Full export and delete. GDPR compliant." },
  { icon: Calendar, title: "Smart Calendar", desc: "Color-coded cycle tracking with one-tap daily logging." },
  { icon: BarChart3, title: "Deep Analytics", desc: "Symptom correlations, mood trends, and cycle health scoring." },
  { icon: Share2, title: "Doctor Sharing", desc: "Share reports with your doctor via secure expiring links." },
  { icon: Sparkles, title: "AI Insights", desc: "\"Headaches appear 80% of your pre-menstrual phases\" — we find patterns." },
];

const steps = [
  { num: "01", title: "Log Your Cycle", desc: "Track periods, symptoms, mood, and energy in seconds." },
  { num: "02", title: "AI Learns You", desc: "Our models study YOUR patterns — not population averages." },
  { num: "03", title: "Get Predictions", desc: "Accurate forecasts with confidence scores and health insights." },
];

const testimonials = [
  { name: "Ananya R.", text: "Finally a tracker that understands my PCOS cycles. The predictions are actually accurate!", rating: 5 },
  { name: "Meera K.", text: "Love the health score and doctor sharing. My gynecologist was impressed.", rating: 5 },
  { name: "Priya S.", text: "The AI insights blew my mind — it found patterns I never noticed.", rating: 5 },
  { name: "Sara T.", text: "Beautiful design, actually useful features. Worth every rupee of premium.", rating: 5 },
];

const faqs = [
  { q: "Is my health data safe?", a: "Absolutely. All data is encrypted at rest with AES-256. We never sell data to third parties. You can export or delete everything at any time." },
  { q: "How accurate are the predictions?", a: "Our ML models achieve 85%+ accuracy after 3 cycles. The more you log, the smarter it gets. We use ARIMA time-series analysis combined with gradient boosting." },
  { q: "Does it work for irregular periods?", a: "Yes! Unlike apps that assume 28-day cycles, CycleAI adapts to YOUR patterns. It's specifically designed for irregular cycles and conditions like PCOS." },
  { q: "Can I share data with my doctor?", a: "Yes — generate a secure, expiring access link. Your doctor sees your cycle history, health score, and symptom summary without creating an account." },
  { q: "What's included in the free plan?", a: "Basic cycle tracking, daily logging, 3-month history, and simple predictions. Premium adds analytics, AI insights, doctor sharing, and unlimited history." },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center gradient-mesh">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Menstrual Health
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Your cycle is <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">unique</span>.
              <br />Your tracker should be too.
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
              CycleAI uses machine learning to understand your irregular patterns,
              predict your next period with confidence intervals, and surface health
              insights you never knew existed.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 gap-2">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="btn-secondary text-lg px-8 py-4">Learn More</a>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Privacy First</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Free Forever Plan</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> PCOS Friendly</span>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <div className="relative">
              <div className="glass-card p-6 space-y-4">
                <div className="text-center mb-2">
                  <p className="font-display text-lg font-semibold text-gray-800">April 2026</p>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isPeriod = day >= 5 && day <= 9;
                    const isFertile = day >= 16 && day <= 22;
                    const isOvulation = day === 19;
                    const isToday = day === 28;
                    return (
                      <motion.div key={i} whileHover={{ scale: 1.15 }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all ${
                          isPeriod ? "bg-red-400 text-white" :
                          isOvulation ? "bg-amber-400 text-white" :
                          isFertile ? "bg-teal-100 text-teal-700" :
                          isToday ? "ring-2 ring-pink-500 text-pink-600 font-bold" :
                          "text-gray-600 hover:bg-pink-50"
                        }`}>{day}</motion.div>
                    );
                  })}
                </div>
                <div className="flex gap-4 justify-center text-xs text-gray-500 pt-2">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400" /> Period</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400" /> Ovulation</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-teal-100 border border-teal-300" /> Fertile</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-4 w-48 animate-float">
                <p className="text-xs text-gray-500">AI Prediction</p>
                <p className="font-mono font-bold text-pink-600 text-lg">May 3</p>
                <p className="text-xs text-gray-400">85% confidence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold text-gray-900">How It Works</motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-gray-500 max-w-lg mx-auto">Three simple steps to smarter cycle tracking.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeInUp}
                className="relative text-center p-6">
                <span className="text-6xl font-display font-bold bg-gradient-to-b from-pink-200 to-transparent bg-clip-text text-transparent">{s.num}</span>
                <h3 className="font-display text-xl font-semibold mt-2 text-gray-900">{s.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────── */}
      <section id="features" className="section-padding bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-gray-500 max-w-lg mx-auto">
              Powerful features designed for real women with real cycles.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(255,111,145,0.15)" }}
                className="glass-card p-6 group cursor-default">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <f.icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="font-display text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Loved by Women Everywhere
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-sm font-semibold text-gray-800">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="section-padding bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-gray-500">Start free. Upgrade when you're ready.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PlanCard key={plan.tier} {...plan} onSelect={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="font-display text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i} aria-label={faq.q}>
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-40" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to understand your body better?
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Join thousands of women who trust CycleAI for smarter, more personalized cycle tracking.
            </p>
            <Link to="/register" className="btn-primary text-lg px-10 py-4 gap-2">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
