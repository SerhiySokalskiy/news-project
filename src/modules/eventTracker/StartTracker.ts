import { EventTracker } from "./EventTracker";

const tracker = new EventTracker({ endpoint: `${import.meta.env.VITE_API_URL}/events` });

tracker.init();
window.__eventTracker = tracker;
console.log("[EventTracker] auto-initialized");

export default tracker;
