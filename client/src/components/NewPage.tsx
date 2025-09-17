import { useParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";

const NewPage = () => {
	const { id } = useParams();
	const newsId = id ? parseInt(id, 10) : undefined;
	const item = useNewsStore((state) => newsId && state.getNewsById(newsId));

	return (
		<div className="bg-gray-100 min-h-screen py-8">
			<div className="max-w-5xl mx-auto px-4">
				{item ? (
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src={`/${item.img}`}
							alt="news preview"
							className="w-full h-64 md:h-96 object-cover"
						/>
						<div className="p-6 flex flex-col gap-4">
							<h1 className="text-3xl font-bold">{item.title}</h1>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">
								{item.fulltext}
							</p>
						</div>
					</div>
				) : (
					<div className="text-center text-xl text-gray-500">
						The news hasnt been found
					</div>
				)}
			</div>
		</div>
	);
};

export default NewPage;
