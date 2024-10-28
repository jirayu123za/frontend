import { create } from 'zustand';

interface AuthState {
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        profile_image?: string;
    } | null;
    setUser: (user: AuthState['user']) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
