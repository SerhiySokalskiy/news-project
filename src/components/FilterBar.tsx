import type React from "react";
import { useState } from "react";

interface FilterBarProps {
	filtersData: { [key: string]: string[] };
	onApply: (selectedFilters: { [key: string]: string | null }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
	filtersData,
	onApply,
}) => {
	const initialState: { [key: string]: string | null } = {};
	Object.keys(filtersData).forEach((key) => {
		initialState[key] = null;
	});

	const [selectedFilters, setSelectedFilters] = useState(initialState);

	const handleChange = (key: string, value: string | null) => {
		setSelectedFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleApply = () => {
		onApply(selectedFilters);
	};

	return (
		<div className="flex flex-wrap items-end gap-4 mb-4 bg-white p-4 rounded shadow">
			{Object.entries(filtersData).map(([key, options]) => {
				const selectId = `select-${key.replace(/\s+/g, "-").toLowerCase()}`;
				return (
					<div key={key} className="flex flex-col">
						<label
							htmlFor={selectId}
							className="mb-1 font-medium text-gray-700"
						>
							{key}
						</label>
						<select
							id={selectId}
							value={selectedFilters[key] ?? ""}
							onChange={(e) => handleChange(key, e.target.value || null)}
							className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
			})}

			<button
				type="button"
				onClick={handleApply}
				className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition-colors"
			>
				Apply Filters
			</button>
		</div>
	);
};
