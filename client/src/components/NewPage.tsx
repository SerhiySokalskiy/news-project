import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export type NewsFullType = {
	id: string;
	url: string;
	image: string;
	title: string;
	text: string[];
	date?: string;
};

const NewPage = () => {
	const { id } = useParams();

	const fetchNewsItem = async (id: string): Promise<NewsFullType> => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/feed/${id}`);
		if (!res.ok) throw new Error("Failed to fetch news");
		return res.json();
	};

	const {
		data: item,
		isLoading,
		isError,
	} = useQuery<NewsFullType, Error>({
		queryKey: ["news", id],
		queryFn: () =>
			id ? fetchNewsItem(id) : Promise.reject(new Error("No ID")),
		enabled: !!id,
	});

	if (isLoading) return <p className="text-center mt-10">Loading...</p>;
	if (isError)
		return <p className="text-center mt-10 text-red-500">Error loading news</p>;

	return (
		<div className="bg-gray-100 min-h-screen py-8">
			<div className="max-w-5xl mx-auto px-4">
				{item ? (
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src={item.image}
							alt={item.title}
							className="w-full h-64 md:h-96 object-cover"
							loading="lazy"
						/>
						<div className="p-6 flex flex-col gap-4">
							<h1 className="text-3xl font-bold">{item.title}</h1>
							{item.text.map((paragraph) => (
								<p
									key={item.id}
									className="text-gray-700 leading-relaxed whitespace-pre-line mb-4"
								>
									{paragraph}
								</p>
							))}
						</div>
					</div>
				) : (
					<div className="text-center text-xl text-gray-500">
						The news hasn't been found
					</div>
				)}
			</div>
		</div>
	);
};

export default NewPage;
