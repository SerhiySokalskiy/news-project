import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const [users, setUsers] = useState<User[]>([
		{ name: "Serhiy", email: "sokalskiyserhiy1@gmail.com", password: "1111" },
	]);
	const navigate = useNavigate();

	const addUser = (user: User) => {
		setUsers((prev) => {
			const newUsers = [...prev, user];
			console.log(newUsers);
			return newUsers;
		});
	};

	const handleLoginSuccess = () => {
		navigate("/");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-sm p-6 border rounded-lg shadow-lg bg-white">
				{isLogin ? (
					<LoginForm
						onSwitch={() => setIsLogin(false)}
						users={users}
						onLoginSuccess={handleLoginSuccess}
					/>
				) : (
					<RegisterForm onSwitch={() => setIsLogin(true)} addUser={addUser} />
				)}
			</div>
		</div>
	);
}
