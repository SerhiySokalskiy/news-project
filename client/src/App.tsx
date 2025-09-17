import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const NewsPage = lazy(() => import("./components/NewsPage"));
const NewPage = lazy(() => import("./components/NewPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));

function App() {
	return (
		<>
			<Navbar />
			<Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
				<Routes>
					<Route path="/" element={<NewsPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/news/:id" element={<NewPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
