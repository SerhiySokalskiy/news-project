import { EventTracker } from "../event-tracker";

declare global {
	interface Window {
		ENABLE_EVENT_TRACKER?: boolean;
		__eventTracker?: EventTracker;
	}
}
