import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/useUserStore";
import { type RegisterSchema, registerSchema } from "../validation/schemas";

interface RegisterFormProps {
	onSwitch: () => void;
}

export default function RegisterForm({ onSwitch }: RegisterFormProps) {
	const addUser = useUserStore((state) => state.addUser);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = (data: RegisterSchema) => {
		addUser(data);
		reset();
		onSwitch();
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-xl font-bold mb-2">Registration</h2>

			<input
				{...register("name")}
				className="border p-2 rounded"
				type="text"
				placeholder="Name"
			/>
			{errors.name && <div className="text-red-500">{errors.name.message}</div>}

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
