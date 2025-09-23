import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "../validation/schemas";
import TextInput from "./TextInput";
import Button from "./Button";

interface RegisterFormProps {
  onSwitch: () => void;
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

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError("email", { message: errData.message || "Registration failed" });
        return;
      }

      reset();
      onSwitch(); // переключаємо на логін після успішної реєстрації
    } catch {
      setError("email", { message: "Server error" });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-2">Registration</h2>

      <TextInput
        {...register("name")}
        type="text"
        placeholder="Name"
      />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}

      <TextInput
        {...register("email")}
        type="email"
        placeholder="Email"
      />
      {errors.email && <div className="text-red-500">{errors.email.message}</div>}

      <TextInput
        {...register("password")}
        type="password"
        placeholder="Password"
      />
      {errors.password && <div className="text-red-500">{errors.password.message}</div>}

      <Button type="submit">Register</Button>

      <p className="mt-2 text-sm text-gray-600">
        Have already account?{" "}
        <Button type="button" variant="link" onClick={onSwitch}>
          Log in
        </Button>
      </p>
    </form>
  );
}
