import type React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ className, ...rest }: TextInputProps) {
	return (
		<input {...rest} className={`border p-2 rounded ${className ?? ""}`} />
	);
}
