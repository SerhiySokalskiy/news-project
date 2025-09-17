import { useState } from "react";
import type { User } from "../types/user";

interface LoginFormProps {
	onSwitch: () => void;
	users: User[];
	onLoginSuccess: () => void;
}

export default function LoginForm({
	onSwitch,
	users,
	onLoginSuccess,
}: LoginFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const user = users.find(
			(u) => u.email === email && u.password === password,
		);

		if (!user) {
			setError("Пользователь не найден");
		} else {
			setError("");
			onLoginSuccess();
		}
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<h2 className="text-xl font-bold mb-2">Logging in</h2>
			{error && <div className="text-red-500">{error}</div>}

			<input
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				name="email"
				className="border p-2 rounded"
				type="email"
				placeholder="Email"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				name="password"
				className="border p-2 rounded"
				type="password"
				placeholder="Password"
			/>
			<button
				type="submit"
				className="mt-2 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
			>
				Log in
			</button>
			<p className="mt-2 text-sm text-gray-600">
				Have no account?{" "}
				<button
					type="button"
					className="text-blue-600 hover:underline cursor-pointer bg-transparent border-0 p-0"
					onClick={onSwitch}
				>
					Registrate
				</button>
			</p>
		</form>
	);
}
