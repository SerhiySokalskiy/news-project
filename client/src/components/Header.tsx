import Navbar from "./Navbar";

export default function Header() {
	return (
		<header className="bg-blue-600 text-white shadow-md">
			<div className="max-w-5xl mx-auto flex justify-between items-center p-4">
				<h1 className="text-xl font-bold">My News App</h1>
				<Navbar />
			</div>
		</header>
	);
}
