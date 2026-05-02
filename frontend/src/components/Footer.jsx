import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #FF6F91, #9D4EDD)" }}>C</div>
              <span className="font-display text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                CycleAI
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your cycle is unique. Your tracker should be too. AI-powered menstrual health.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Analytics", "Doctor Sharing"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "GDPR", "Data Deletion"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CycleAI. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for your health
          </p>
        </div>
      </div>
    </footer>
  );
}
