import { useState } from "react";
import type { TrackedEvent } from "../types/event";
import { FilterBar } from "./FilterBar";

export default function EventsPage() {
	const [events, setEvents] = useState<TrackedEvent[]>([]);
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
			"	http://localhost:5173/events",
			"	http://localhost:5173/login",
			"	http://localhost:5173/prebitlogs",
			"	http://localhost:5173/",
			"all",
		],
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

			const res = await fetch(
				`http://localhost:3000/events?${query.toString()}`,
			);
			if (!res.ok) throw new Error("Failed to fetch events");

			const json = await res.json();
			setEvents(json as TrackedEvent[]);
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
		if (page > 1) {
			const newPage = page - 1;
			setPage(newPage);
			fetchEvents(selectedFilters, newPage);
		}
	};

	const handleNextPage = () => {
		const newPage = page + 1;
		setPage(newPage);
		fetchEvents(selectedFilters, newPage);
	};

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
							`http://localhost:3000/events/export?${query.toString()}`,
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

			{!loading && !error && events.length > 0 && (
				<>
					<table className="w-full border-collapse border border-gray-300 mb-4">
						<thead className="bg-gray-100">
							<tr>
								{events[0].eventType !== undefined && (
									<th className="border p-2 text-left">Type</th>
								)}
								{events[0].timestamp !== undefined && (
									<th className="border p-2 text-left">Timestamp</th>
								)}
								{events[0].sessionId !== undefined && (
									<th className="border p-2 text-left">Session</th>
								)}
								{events[0].pageUrl !== undefined && (
									<th className="border p-2 text-left">Page URL</th>
								)}
								{events[0].userAgent !== undefined && (
									<th className="border p-2 text-left">User Agent</th>
								)}
								{events[0].data !== undefined && (
									<th className="border p-2 text-left">Data</th>
								)}
							</tr>
						</thead>
						<tbody>
							{events.map((e) => (
								<tr
									key={`${e.sessionId}-${e.timestamp}`}
									className="hover:bg-gray-50"
								>
									{e.eventType !== undefined && (
										<td className="border p-2">{e.eventType}</td>
									)}
									{e.timestamp !== undefined && (
										<td className="border p-2">{e.timestamp}</td>
									)}
									{e.sessionId !== undefined && (
										<td className="border p-2">{e.sessionId}</td>
									)}
									{e.pageUrl !== undefined && (
										<td className="border p-2">{e.pageUrl}</td>
									)}
									{e.userAgent !== undefined && (
										<td className="border p-2">{e.userAgent}</td>
									)}
									{e.data !== undefined && (
										<td className="border p-2">
											<pre className="whitespace-pre-wrap">
												{JSON.stringify(e.data, null, 2)}
											</pre>
										</td>
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
						<span className="px-3 py-1">Page {page}</span>
						<button
							type="button"
							onClick={handleNextPage}
							className="px-3 py-1 bg-gray-200 rounded"
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}
