import { create } from "zustand";
import type { User } from "../types/user";

interface UserState {
	users: User[];
	addUser: (user: User) => void;
	login: (email: string, password: string) => User | null;
}

export const useUserStore = create<UserState>((set, get) => ({
	users: [
		{ name: "Serhiy", email: "sokalskiyserhiy1@gmail.com", password: "1111" },
	],
	addUser: (user) => set((state) => ({ users: [...state.users, user] })),
	login: (email, password) => {
		const user = get().users.find(
			(u) => u.email === email && u.password === password,
		);
		return user || null;
	},
}));
