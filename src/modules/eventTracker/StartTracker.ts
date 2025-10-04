import { EventTracker } from "./EventTracker";

const tracker = new EventTracker({ endpoint: "http://localhost:3000/events" });

tracker.init();
window.__eventTracker = tracker;
console.log("[EventTracker] auto-initialized");

export default tracker;
