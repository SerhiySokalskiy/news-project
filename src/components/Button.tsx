import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "link";
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
	if (variant === "link") {
		return (
			<button
				{...props}
				className={`text-blue-600 hover:underline cursor-pointer bg-transparent border-0 p-0 ${props.className ?? ""}`}
			/>
		);
	}

	return (
		<button
			{...props}
			className={`mt-2 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors ${props.className ?? ""}`}
		/>
	);
}
