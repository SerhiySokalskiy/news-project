import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import NewPage from "./components/NewPage";
import NewsPage from "./components/NewsPage";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<NewsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/news/:id" element={<NewPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
}

export default App;
