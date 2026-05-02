import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Download, Trash2, Bell, Share2, Plus, Copy, Eye, EyeOff } from "lucide-react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, logout } = useAuthStore();
  const [name, setName] = useState(user?.full_name || "");
  const [email] = useState(user?.email || "");
  const [showDelete, setShowDelete] = useState(false);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [tokens] = useState([
    { id: 1, doctor_email: "dr.sharma@clinic.com", expires: "May 15, 2026", active: true },
  ]);

  const handleSaveProfile = () => toast.success("Profile updated!");
  const handleExportData = () => toast.success("Preparing data export...");
  const handleDeleteAccount = () => { toast.success("Account deletion requested."); logout(); };
  const handleCreateToken = () => {
    if (!doctorEmail) { toast.error("Enter doctor's email"); return; }
    toast.success(`Access link sent to ${doctorEmail}`);
    setDoctorEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
        </motion.div>

        {/* Profile */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-pink-500" /> Profile
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input type="email" value={email} disabled className="input-field bg-gray-100 cursor-not-allowed" />
            </div>
            <button onClick={handleSaveProfile} className="btn-primary !py-2 !px-6 text-sm">Save Changes</button>
          </div>
        </motion.div>

        {/* Doctor Sharing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-500" /> Doctor Sharing
          </h3>
          <div className="flex gap-2 mb-4">
            <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)}
              placeholder="Doctor's email" className="input-field flex-1" />
            <button onClick={handleCreateToken} className="btn-primary !py-2 !px-4 gap-1 text-sm">
              <Plus className="w-4 h-4" /> Share
            </button>
          </div>
          {tokens.length > 0 && (
            <div className="space-y-2">
              {tokens.map((t) => (
                <div key={t.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.doctor_email}</p>
                    <p className="text-xs text-gray-500">Expires: {t.expires}</p>
                  </div>
                  <button className="text-xs text-red-500 hover:text-red-700 font-medium" aria-label="Revoke token">Revoke</button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Data & Privacy */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-500" /> Data & Privacy
          </h3>
          <div className="space-y-3">
            <button onClick={handleExportData} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Export All Data (GDPR)</span>
              </div>
              <span className="text-xs text-gray-400">JSON</span>
            </button>
            <button onClick={() => setShowDelete(true)}
              className="w-full flex items-center gap-2 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete Account & All Data</span>
            </button>
          </div>
          {showDelete && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 border-2 border-red-300 rounded-lg bg-red-50">
              <p className="text-sm text-red-700 mb-3">
                This will permanently delete your account and all data. This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setShowDelete(false)} className="btn-secondary !py-2 !px-4 text-sm flex-1">Cancel</button>
                <button onClick={handleDeleteAccount}
                  className="flex-1 py-2 px-4 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">
                  Delete Forever
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
