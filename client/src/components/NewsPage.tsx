import { useQuery } from "@tanstack/react-query";
import NewPreview from "./NewPreview";
import type { NewsType } from "../types/new";

const NewsPage = () => {
	const fetchNews = async (): Promise<NewsType[]> => {
    const res = await fetch("http://localhost:3000/feed");
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await res.json();
    return data.feed;
  	};

	const {
		data: news,
		isLoading,
		isError,
	} = useQuery<NewsType[], Error>({
		queryKey: ["news"],
		queryFn: fetchNews,
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading news</p>;

	return (
		<div className="bg-gray-100 min-h-screen py-8">
			<div className="max-w-5xl mx-auto px-4">
				<h1 className="text-4xl font-semibold mb-8 text-center">News Page</h1>

				<div className="flex flex-col gap-6">
					{news?.map((item) => (
						<NewPreview
							key={item.id}
							id={item.id}
							title={item.title}
							text={item.text}
							image={item.image}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default NewsPage;
