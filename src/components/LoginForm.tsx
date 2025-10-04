import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/useUserStore";
import { type LoginSchema, loginSchema } from "../validation/schemas";
import Button from "./Button";
import TextInput from "./TextInput";

interface LoginFormProps {
	onSwitch: () => void;
	onLoginSuccess: (token: string) => void;
}

async function loginRequest(data: LoginSchema) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const errData = await res.json();
		throw new Error(errData.message || "Login failed");
	}

	return res.json();
}

export default function LoginForm({
	onSwitch,
	onLoginSuccess,
}: LoginFormProps) {
	const setUser = useUserStore((state) => state.setUser);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const mutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: (result) => {
			localStorage.setItem("accessToken", result.accessToken);
			setUser(result.user);
			onLoginSuccess(result.accessToken);
		},
		onError: (error) => {
			setError("email", { message: error.message });
		},
	});

	const onSubmit = (data: LoginSchema) => {
		mutation.mutate(data);
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-xl font-bold mb-2">Logging in</h2>

			<TextInput {...register("email")} type="email" placeholder="Email" />
			{errors.email && (
				<div className="text-red-500">{errors.email.message}</div>
			)}

			<TextInput
				{...register("password")}
				type="password"
				placeholder="Password"
			/>
			{errors.password && (
				<div className="text-red-500">{errors.password.message}</div>
			)}

			<Button type="submit" disabled={mutation.isPending}>
				{mutation.isPending ? "Logging in..." : "Log in"}
			</Button>

			<div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
				<span>Have no account?</span>
				<Button type="button" variant="link" onClick={onSwitch}>
					Register
				</Button>
			</div>
		</form>
	);
}
