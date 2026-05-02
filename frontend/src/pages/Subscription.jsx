import { motion } from "framer-motion";
import { Check, Crown, CreditCard, ExternalLink } from "lucide-react";
import PlanCard from "@/components/PlanCard";
import { SUBSCRIPTION_PLANS } from "@/utils/constants";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function Subscription() {
  const { user } = useAuthStore();
  const currentTier = user?.subscription_tier || "free";

  const handleSelect = (tier) => {
    if (tier === currentTier) return;
    toast.success(`Redirecting to Stripe checkout for ${tier}...`);
  };

  const usage = { logs: 45, logsLimit: currentTier === "free" ? 90 : "∞", predictions: 8, predLimit: currentTier === "free" ? 10 : "∞" };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl font-bold text-gray-900">Subscription</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your plan and billing</p>
        </motion.div>

        {/* Current Plan */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="font-display text-xl font-bold text-gray-900 capitalize">{currentTier}</p>
              </div>
            </div>
            {currentTier !== "free" && (
              <button className="btn-secondary !py-2 !px-4 gap-2 text-sm">
                <CreditCard className="w-4 h-4" /> Manage Billing
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Usage Meters */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Daily Logs</span>
                <span className="font-mono font-medium">{usage.logs} / {usage.logsLimit}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full transition-all"
                  style={{ width: typeof usage.logsLimit === "number" ? `${(usage.logs / usage.logsLimit) * 100}%` : "30%" }} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Predictions</span>
                <span className="font-mono font-medium">{usage.predictions} / {usage.predLimit}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: typeof usage.predLimit === "number" ? `${(usage.predictions / usage.predLimit) * 100}%` : "20%" }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Plan Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <PlanCard key={plan.tier} {...plan}
                cta={plan.tier === currentTier ? "Current Plan" : plan.cta}
                onSelect={handleSelect} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
