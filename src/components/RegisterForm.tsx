import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { type RegisterSchema, registerSchema } from "../validation/schemas";
import Button from "./Button";
import TextInput from "./TextInput";

interface RegisterFormProps {
	onSwitch: () => void;
}

async function registerRequest(data: RegisterSchema) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/registration`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const errData = await res.json();
		throw new Error(errData.message || "Registration failed");
	}

	return res.json();
}

export default function RegisterForm({ onSwitch }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
	});

	const mutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			reset();
			onSwitch();
		},
		onError: (error) => {
			setError("email", { message: error.message });
		},
	});

	const onSubmit = (data: RegisterSchema) => {
		mutation.mutate(data);
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-xl font-bold mb-2">Registration</h2>

			<TextInput {...register("name")} type="text" placeholder="Name" />
			{errors.name && <div className="text-red-500">{errors.name.message}</div>}

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
				{mutation.isPending ? "Registering..." : "Register"}
			</Button>

			<div className="mt-2 text-sm text-gray-600">
				<span>Have already account? </span>
				<Button type="button" variant="link" onClick={onSwitch}>
					Log in
				</Button>
			</div>
		</form>
	);
}
