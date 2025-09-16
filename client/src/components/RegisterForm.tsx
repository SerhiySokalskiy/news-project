import { useState } from "react";
import type { User } from "../types/user";

interface RegisterFormProps {
	onSwitch: () => void;
	addUser: (user: User) => void;
}

export default function RegisterForm({ onSwitch, addUser }: RegisterFormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addUser({ name, email, password });
		setName("");
		setEmail("");
		setPassword("");
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<h2 className="text-xl font-bold mb-2">Registration</h2>
			<input
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border p-2 rounded"
				type="text"
				placeholder="Name"
			/>
			<input
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="border p-2 rounded"
				type="email"
				placeholder="Email"
			/>
			<input
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="border p-2 rounded"
				type="password"
				placeholder="Password"
			/>
			<button
				type="submit"
				className="mt-2 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
			>
				Registrate
			</button>
			<p className="mt-2 text-sm text-gray-600">
				Have already account?{" "}
				<button
					type="button"
					className="text-blue-600 hover:underline cursor-pointer bg-transparent border-0 p-0"
					onClick={onSwitch}
				>
					Log in
				</button>
			</p>
		</form>
	);
}
