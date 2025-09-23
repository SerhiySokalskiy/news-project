import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const NewsPage = lazy(() => import("./components/NewsPage"));
const NewPage = lazy(() => import("./components/NewPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">
				<Suspense
					fallback={<div className="text-center mt-10">Loading...</div>}
				>
					<Routes>
						<Route path="/" element={<NewsPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/news/:id" element={<NewPage />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</div>
	);
}

export default App;
