import type { EventPayloads } from "./types/EventTypes";

type EventName = keyof EventPayloads;

interface TrackerConfig {
	endpoint: string;
	flushInterval?: number;
	maxBatchSize?: number;
	sessionId?: string;
}

interface TrackedEvent<T extends EventName = EventName> {
	eventType: T;
	timestamp: number;
	sessionId: string;
	pageUrl: string;
	userAgent: string;
	data: EventPayloads[T];
}

export class EventTracker {
	private config: Required<TrackerConfig>;
	private cache: TrackedEvent[] = [];
	private timerId: number | null = null;
	private enabled = false;

	private readonly EVENTS: EventName[] = [
		"load_page",
		"load_ad_module",
		"auctionInit",
		"auctionEnd",
		"bidRequested",
		"bidResponse",
		"bidWon",
	];

	constructor(userConfig: TrackerConfig) {
		this.config = {
			flushInterval: 5000,
			maxBatchSize: 20,
			sessionId: userConfig.sessionId || this.generateSessionId(),
			...userConfig,
		};
	}

	init() {
		if (this.enabled) return;
		this.enabled = true;

		this.EVENTS.forEach((eventName) => {
			window.addEventListener(eventName, (e: Event) => {
				const custom = e as CustomEvent<EventPayloads[typeof eventName]>;
				this.track(eventName, custom.detail);
			});
		});

		this.timerId = window.setInterval(
			() => this.flush(),
			this.config.flushInterval,
		);

		window.addEventListener("beforeunload", () => this.flushOnUnload());
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "hidden") this.flushOnUnload();
		});

		console.log("[EventTracker] initialized. Session:", this.config.sessionId);
	}

	private track<T extends EventName>(eventType: T, data: EventPayloads[T]) {
		if (!this.enabled) return;

		const event: TrackedEvent<T> = {
			eventType,
			timestamp: Date.now(),
			sessionId: this.config.sessionId,
			pageUrl: window.location.href,
			userAgent: navigator.userAgent,
			data,
		};

		this.cache.push(event);
		console.log(`[EventTracker] Event: ${eventType}`, event);

		if (this.cache.length >= this.config.maxBatchSize) this.flush();
	}

	private flush() {
		if (!this.enabled || this.cache.length === 0) return;

		const payload = JSON.stringify(this.cache);

		const eventsToSend = [...this.cache];
		this.cache = [];

		try {
			if (navigator.sendBeacon) {
				const blob = new Blob([payload], { type: "application/json" });
				navigator.sendBeacon(this.config.endpoint, blob);
			} else {
				fetch(this.config.endpoint, {
					method: "POST",
					body: payload,
					headers: { "Content-Type": "application/json" },
				});
			}
			console.log(`[EventTracker] Flushed ${eventsToSend.length} events`);
		} catch (err) {
			console.warn("[EventTracker] flush failed:", err);
			this.cache.unshift(...eventsToSend); 
		}
	}

	private flushOnUnload() {
		if (this.cache.length === 0) return;
		const payload = JSON.stringify(this.cache);
		if (navigator.sendBeacon) {
			const blob = new Blob([payload], { type: "application/json" });
			navigator.sendBeacon(this.config.endpoint, blob);
		}
		this.cache = [];
	}

	disable() {
		this.enabled = false;
		if (this.timerId) clearInterval(this.timerId);
		this.cache = [];
		console.log("[EventTracker] disabled");
	}

	private generateSessionId(): string {
		return `sess_${Math.random().toString(36).substr(2, 9)}`;
	}
}
