import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../validation/schemas";
import { useUserStore } from "../store/useUserStore";
import TextInput from "./TextInput";
import Button from "./Button";

interface LoginFormProps {
  onSwitch: () => void;
  onLoginSuccess: (token: string) => void;
}

export default function LoginForm({ onSwitch, onLoginSuccess }: LoginFormProps) {
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError("email", { message: errData.message || "Login failed" });
        return;
      }

      const result = await res.json();
      localStorage.setItem("accessToken", result.accessToken);
      setUser(result.user);
      onLoginSuccess(result.accessToken);
    } catch {
      setError("email", { message: "Server error" });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-2">Logging in</h2>

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

      <Button type="submit">Log in</Button>

      <p className="mt-2 text-sm text-gray-600">
        Have no account?{" "}
        <Button type="button" variant="link" onClick={onSwitch}>
          Register
        </Button>
      </p>
    </form>
  );
}
