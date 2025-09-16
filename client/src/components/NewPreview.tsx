import type React from "react";
import { Link } from "react-router-dom";

interface NewPreviewProps {
	id: number;
	title: string;
	text: string;
	img: string;
}

const NewPreview: React.FC<NewPreviewProps> = ({ id, title, text, img }) => {
	return (
		<Link to={`/news/${id}`} className="block">
			<div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
				<img
					src={img}
					alt="news preview"
					className="w-full md:w-48 h-48 object-cover"
				/>
				<div className="p-4 flex flex-col justify-between">
					<h2 className="text-xl font-semibold mb-2">{title}</h2>
					<p className="text-gray-700 line-clamp-5">{text}</p>
				</div>
			</div>
		</Link>
	);
};

export default NewPreview;
