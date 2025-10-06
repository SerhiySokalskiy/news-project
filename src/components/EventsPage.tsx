import { useState } from "react";
import type { AggregatedEvent } from "../types/event";
import { FilterBar } from "./FilterBar";

export default function EventsPage() {
	const [events, setEvents] = useState<AggregatedEvent[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const filtersData = {
		eventType: [
			"auctionEnd",
			"bidRequested",
			"auctionInit",
			"load_ad_module",
			"load_page",
			"all",
		],
		pageUrl: [
			`${import.meta.env.VITE_API_URL}/events`,
			`${import.meta.env.VITE_API_URL}/login`,
			`${import.meta.env.VITE_API_URL}/prebitlogs`,
			`${import.meta.env.VITE_API_URL}/`,
			"all",
		],
		timestamp: ["show"],
		data: ["show"],
		sessionId: ["show"],
		userAgent: ["show"],
	};

	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: string | null;
	}>({
		eventType: null,
		date: null,
	});

	const [page, setPage] = useState<number>(1);
	const limit = 10;

	const fetchEvents = async (
		filters: { [key: string]: string | null },
		pageNum: number,
	) => {
		setLoading(true);
		setError(null);

		try {
			const query = new URLSearchParams();
			Object.entries(filters).forEach(([key, value]) => {
				if (value) query.append(key, value);
			});

			const offset = (pageNum - 1) * limit;
			query.append("offset", offset.toString());
			query.append("limit", limit.toString());

			const res = await fetch(`${import.meta.env.VITE_API_URL}/events?${query.toString()}`);
			if (!res.ok) throw new Error("Failed to fetch events");

			const json = await res.json();
			setEvents(json);
		} catch (err) {
			setError((err as Error).message);
			setEvents([]);
		} finally {
			setLoading(false);
		}
	};

	const handleApplyFilters = (filters: { [key: string]: string | null }) => {
		setSelectedFilters(filters);
		setPage(1);
		fetchEvents(filters, 1);
	};

	const handlePrevPage = () => {
		if (page > 1) setPage(page - 1);
	};

	const handleNextPage = () => {
		const totalPages = Math.ceil(events.length / limit);
		if (page < totalPages) setPage(page + 1);
	};

	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const paginatedEvents = events.slice(startIndex, endIndex);

	const totalPages = Math.ceil(events.length / limit);

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">All Events</h1>
			<FilterBar filtersData={filtersData} onApply={handleApplyFilters} />

			<div className="mt-2 mb-4">
				<button
					type="button"
					onClick={() => {
						const query = new URLSearchParams();
						Object.entries(selectedFilters).forEach(([key, value]) => {
							if (value) query.append(key, value);
						});
						window.open(
							`${import.meta.env.VITE_API_URL}/events/export?${query.toString()}`,
							"_blank",
						);
					}}
					className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Export CSV
				</button>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">Error: {error}</p>}

			{!loading && !error && paginatedEvents.length > 0 && (
				<>
					<table className="w-full border-collapse border border-gray-300 mb-4">
						<thead className="bg-gray-100">
							<tr>
								{paginatedEvents[0].values.eventType !== undefined && (
									<th className="border p-2 text-left">Type</th>
								)}
								{paginatedEvents[0].values.timestamp !== undefined && (
									<th className="border p-2 text-left">Timestamp</th>
								)}
								{paginatedEvents[0].values.sessionId !== undefined && (
									<th className="border p-2 text-left">Session</th>
								)}
								{paginatedEvents[0].values.pageUrl !== undefined && (
									<th className="border p-2 text-left">Page URL</th>
								)}
								{paginatedEvents[0].values.userAgent !== undefined && (
									<th className="border p-2 text-left">User Agent</th>
								)}
								{paginatedEvents[0].values.data !== undefined && (
									<th className="border p-2 text-left">Data</th>
								)}
								{paginatedEvents[0].count !== undefined && (
									<th className="border p-2 text-left">Amount</th>
								)}
							</tr>
						</thead>
						<tbody>
							{paginatedEvents.map((e) => (
								<tr
									key={`${e.values.sessionId}-${e.values.timestamp}`}
									className="hover:bg-gray-50"
								>
									{e.values.eventType !== undefined && (
										<td className="border p-2">{e.values.eventType}</td>
									)}
									{e.values.timestamp !== undefined && (
										<td className="border p-2">{e.values.timestamp}</td>
									)}
									{e.values.sessionId !== undefined && (
										<td className="border p-2">{e.values.sessionId}</td>
									)}
									{e.values.pageUrl !== undefined && (
										<td className="border p-2">{e.values.pageUrl}</td>
									)}
									{e.values.userAgent !== undefined && (
										<td className="border p-2">{e.values.userAgent}</td>
									)}
									{e.values.data !== undefined && (
										<td className="border p-2">
											<pre className="whitespace-pre-wrap">
												{JSON.stringify(e.values.data, null, 2)}
											</pre>
										</td>
									)}
									{e.count !== undefined && (
										<td className="border p-2">{e.count}</td>
									)}
								</tr>
							))}
						</tbody>
					</table>

					<div className="flex gap-2 justify-end">
						<button
							type="button"
							onClick={handlePrevPage}
							disabled={page === 1}
							className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
						>
							Previous
						</button>
						<span className="px-3 py-1">
							Page {page} of {totalPages}
						</span>
						<button
							disabled={page === totalPages}
							type="button"
							onClick={handleNextPage}
							className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}
