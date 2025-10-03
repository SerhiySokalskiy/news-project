import type React from "react";

interface DropdownSelectProps {
	label: string;
	value: string | null;
	options: string[];
	onChange: (value: string | null) => void;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
	label,
	value,
	options,
	onChange,
}) => {
	const selectId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className="dropdown-select">
			<label htmlFor={selectId}>{label}</label>
			<select
				id={selectId}
				value={value ?? ""}
				onChange={(e) => onChange(e.target.value || null)}
			>
				<option value="">none</option>
				{options.map((opt) => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>
		</div>
	);
};
