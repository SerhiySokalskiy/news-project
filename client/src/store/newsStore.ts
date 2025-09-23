import { create } from "zustand";
import type { NewsType } from "../types/new";

interface NewsStore {
	news: NewsType[];
	getNewsById: (id: string) => NewsType | undefined;
}

export const useNewsStore = create<NewsStore>((_set, get) => ({
	news: [
	],
	getNewsById: (id) => get().news.find((n) => n.id === id),
}));