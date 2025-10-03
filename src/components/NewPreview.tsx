import type React from "react";
import { Link } from "react-router-dom";

interface NewPreviewProps {
	id: string;
	title: string;
	text: string;
	image: string;
}

const NewPreview: React.FC<NewPreviewProps> = ({ id, title, text, image }) => {
	return (
		<Link to={`/news/${id}`} className="block">
			<div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
				<img
					src={image}
					alt="news preview"
					className="w-full md:w-48 h-48 object-cover"
					loading="lazy"
				/>
				<div className="p-4 flex flex-col justify-between">
					<h1 className="text-3xl font-semibold mb-2">{title}</h1>
					<h2 className="text-gray-700 text-xl line-clamp-5">{text}</h2>
				</div>
			</div>
		</Link>
	);
};

export default NewPreview;
