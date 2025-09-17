import { useNewsStore } from "../store/newsStore";
import NewPreview from "./NewPreview";

const NewsPage = () => {
	const news = useNewsStore((state) => state.news);

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

export default NewsPage;
