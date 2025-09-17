import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/useUserStore";
import { type LoginSchema, loginSchema } from "../validation/schemas";

interface LoginFormProps {
	onSwitch: () => void;
	onLoginSuccess: () => void;
}

export default function LoginForm({
	onSwitch,
	onLoginSuccess,
}: LoginFormProps) {
	const login = useUserStore((state) => state.login);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginSchema) => {
		const user = login(data.email, data.password);
		if (!user) {
			setError("email", { message: "User hasnt been found" });
		} else {
			onLoginSuccess();
		}
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-xl font-bold mb-2">Logging in</h2>

			<input
				{...register("email")}
				className="border p-2 rounded"
				type="email"
				placeholder="Email"
			/>
			{errors.email && (
				<div className="text-red-500">{errors.email.message}</div>
			)}

			<input
				{...register("password")}
				className="border p-2 rounded"
				type="password"
				placeholder="Password"
			/>
			{errors.password && (
				<div className="text-red-500">{errors.password.message}</div>
			)}

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
