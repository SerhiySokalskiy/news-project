import NewPreview from "./NewPreview";

const newsPage = () => {
	const news = [
		{
			id: 1,
			title:
				"Strengthening the STEM Teaching Capacity of Secondary School Teachers in Ho Chi Minh City",
			text: "HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education. The training enhanced the capacity of teachers from eight secondary schools to design and implement interdisciplinary STEM lesson plans...",
			img: "C4F971A9C045F3EEA9FD811A6963325A73328EE2.jpg",
		},
		{
			id: 2,
			title:
				"Strengthening the STEM Teaching Capacity of Secondary School Teachers in Ho Chi Minh City",
			text: "HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education...",
			img: "C4F971A9C045F3EEA9FD811A6963325A73328EE2.jpg",
		},
		{
			id: 3,
			title:
				"Strengthening the STEM Teaching Capacity of Secondary School Teachers in Ho Chi Minh City",
			text: "HO CHI MINH CITY, VIETNAM – August 15–16, 2025 – The Kenan Foundation Asia, in collaboration with the Ministry of Education and Training, successfully organized a Teacher Training Course on STEM Education...",
			img: "C4F971A9C045F3EEA9FD811A6963325A73328EE2.jpg",
		},
	];

	return (
		<div className="bg-gray-100 min-h-screen py-8">
			<div className="max-w-5xl mx-auto px-4">
				<h1 className="text-4xl font-semibold mb-8 text-center">News Page</h1>

				<div className="flex flex-col gap-6">
					{news.map((item) => (
						<NewPreview
							key={item.id}
							id={item.id}
							title={item.title}
							text={item.text}
							img={item.img}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default newsPage;
