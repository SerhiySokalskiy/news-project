export type EventPayloads = {
	load_page: { referrer: string };
	load_ad_module: { moduleId: string };
	auctionInit: { auctionId: string; placements: number };
	auctionEnd: { auctionId: string; duration: number };
	bidRequested: { auctionId: string; bidderId: string; placementId: string };
	bidResponse: {
		auctionId: string;
		bidderId: string;
		placementId: string;
		cpm: number;
		creativeId: string;
	};
	bidWon: {
		auctionId: string;
		bidderId: string;
		placementId: string;
		cpm: number;
		creativeId: string;
	};
};

type EventName = keyof EventPayloads;

export interface TrackedEvent<T extends EventName = EventName> {
	eventType: T;
	timestamp: number;
	sessionId: string;
	pageUrl: string;
	userAgent: string;
	data: EventPayloads[T];
}

export type AggregatedEvent = {
  values: TrackedEvent;
  count: number;
};
