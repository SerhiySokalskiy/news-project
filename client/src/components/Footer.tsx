export default function Footer() {
	return (
		<footer className="bg-gray-200 text-gray-700 py-4">
			<div className="max-w-5xl mx-auto text-center">
				&copy; {new Date().getFullYear()} My News App. All rights reserved.
			</div>
		</footer>
	);
}
