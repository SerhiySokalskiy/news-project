import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdSlot from "./AdSlot";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();

	const handleLoginSuccess = () => {
		navigate("/");
	};

	return (
		<div className="flex justify-around">
			<AdSlot slotId="ad-slot" width={300} height={250} />
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-full max-w-sm p-6 border rounded-lg shadow-lg bg-white">
					{isLogin ? (
						<LoginForm
							onSwitch={() => setIsLogin(false)}
							onLoginSuccess={handleLoginSuccess}
						/>
					) : (
						<RegisterForm onSwitch={() => setIsLogin(true)} />
					)}
				</div>
			</div>
			<AdSlot slotId="ad-slot3" width={300} height={250} />
		</div>
	);
}
