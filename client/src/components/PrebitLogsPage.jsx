import React, { useEffect, useState } from 'react';
import AdSlot from './AdSlot';

const PrebidLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!window.pbjs) {
      console.warn('Prebid.js не завантажений');
      return;
    }

    const logEvent = (eventName, data) => {
      setLogs(prev => [...prev, { eventName, data }]);
      console.log(eventName, data);
    };

    const events = ['bidRequested', 'bidResponse', 'bidWon', 'auctionEnd', 'noBid'];

    events.forEach(event => {
      window.pbjs.onEvent(event, data => logEvent(event, data));
    });

    return () => {
      events.forEach(event => {
        if (window.pbjs.offEvent) {
          window.pbjs.offEvent(event);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 min-h-screen">
      <div className="flex-shrink-0">
        <AdSlot slotId="ad-slot" width={300} height={250} />
      </div>

      <div className="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto h-[80vh]">
        <h2 className="text-xl font-bold mb-4">Prebid Event Logs</h2>
        {logs.length === 0 && <p className="text-gray-500">Поки що немає подій...</p>}
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="bg-white p-2 mb-2 rounded shadow-sm text-sm break-words"
          >
            <span className="font-semibold">{log.eventName}</span>: {JSON.stringify(log.data)}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0">
        <AdSlot slotId="ad-slot2" width={300} height={250} />
      </div>
    </div>
  );
};

export default PrebidLogs;
