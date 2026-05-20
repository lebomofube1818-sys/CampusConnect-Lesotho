import { create } from 'zustand';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'student' | 'vendor' | null;
  school?: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const getStoredUser = (): User | null => {
  try {
    const data = localStorage.getItem('campus_connect_user');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  loading: true,
  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem('campus_connect_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('campus_connect_user');
      }
    } catch (e) {
      console.error('Failed to persist user session:', e);
    }
    set({ user });
  },
  setLoading: (loading) => set({ loading }),
}));
