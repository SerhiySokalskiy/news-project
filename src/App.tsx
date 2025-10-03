import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrebidLogs from "./components/PrebitLogsPage";
import "virtual:plugins";
import EventsPage from "./components/EventsPage";

const NewsPage = lazy(() => import("./components/NewsPage"));
const NewPage = lazy(() => import("./components/NewPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));

function App() {
	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent("load_page", {
				detail: {
					referrer: document.referrer,
				},
			}),
		);
	}, []);
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
						<Route path="/prebitlogs" element={<PrebidLogs />} />
						<Route path="/events" element={<EventsPage />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</div>
	);
}

export default App;
