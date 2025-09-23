import { create } from "zustand";

interface UserState {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: UserState | null;
  setUser: (user: UserState) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
