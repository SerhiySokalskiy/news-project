import { create } from "zustand";
import type { NewsType } from "../types/new";

interface NewsStore {
	news: NewsType[];
	getNewsById: (id: number) => NewsType | undefined;
}

export const useNewsStore = create<NewsStore>((_set, get) => ({
	news: [
		{
			id: 1,
			title:
				"Strengthening the STEM Teaching Capacity of Secondary School Teachers in Ho Chi Minh City",
			text: "HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education...",
			fulltext:
				"HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education. The training enhanced the capacity of teachers from eight secondary schools to design and implement interdisciplinary STEM lesson plans. This training activity was part of the wider “Boeing Technology Enhanced Learning Vietnam 2021–2025” program, implemented in Ho Chi Minh City in 2025 with sponsorship from the Boeing Company. Kenan was honored to welcome representatives from the Department of General Education – Ministry of Education and Training, the Ho Chi Minh City Department of Education and Training, and Mr. Michael Nguyen – Country Director of Boeing Vietnam. The training brought together 56 teachers from eight secondary schools across Ho Chi Minh City, offering them access to essential knowledge, practical skills, and valuable resources. These efforts aimed to empower educators to inspire learning and cultivate creativity among students, particularly in the areas of science, technology, and creative innovation.Participants were guided through the process of designing and delivering interdisciplinary STEM lesson plans, integrating artificial intelligence (AI) tools to support lesson development and classroom application. In addition, the program supported participating schools in incorporating STEM education into both subject-specific and school-wide plans for the 2025–2026 academic year...",
			img: "C4F971A9C045F3EEA9FD811A6963325A73328EE2.jpg",
		},
		{
			id: 2,
			title:
				"Strengthening the STEM Teaching Capacity of Secondary School Teachers in Ho Chi Minh City",
			text: "HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia...",
			fulltext:
				"HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education. The training enhanced the capacity of teachers from eight secondary schools to design and implement interdisciplinary STEM lesson plans...",
			img: "C4F971A9C045F3EEA9FD811A6963325A73328EE2.jpg",
		},
		{
			id: 3,
			title:
				"Strengthening the STEM Teaching Capacity of Secondary School Teachers in Ho Chi Minh City",
			text: "HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia...",
			fulltext:
				"HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education. The training enhanced the capacity of teachers from eight secondary schools to design and implement interdisciplinary STEM lesson plans...",
			img: "C4F971A9C045F3EEA9FD811A6963325A73328EE2.jpg",
		},
	],
	getNewsById: (id) => get().news.find((n) => n.id === id),
}));
