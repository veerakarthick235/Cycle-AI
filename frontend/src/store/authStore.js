import { create } from "zustand";
import { mockUser } from "@/utils/mockData";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("cycleai_token") || null,
  isAuthenticated: false,
  isLoading: false,

  login: (email, password) => {
    set({ isLoading: true });
    // Simulate API delay then set mock user
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("cycleai_token", token);
        set({ user: { ...mockUser, email }, token, isAuthenticated: true, isLoading: false });
        resolve({ success: true });
      }, 800);
    });
  },

  register: (data) => {
    set({ isLoading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("cycleai_token", token);
        set({
          user: { ...mockUser, email: data.email, full_name: data.full_name, onboarding_done: false },
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        resolve({ success: true });
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem("cycleai_token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  completeOnboarding: (data) => {
    set((state) => ({
      user: {
        ...state.user,
        ...data,
        onboarding_done: true,
      },
    }));
  },

  // Auto-login with mock data for demo purposes
  initializeAuth: () => {
    const token = localStorage.getItem("cycleai_token");
    if (token) {
      set({ user: mockUser, token, isAuthenticated: true });
    }
  },
}));

export default useAuthStore;
