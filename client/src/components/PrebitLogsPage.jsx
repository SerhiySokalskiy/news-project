import React, { useEffect, useState } from 'react';
import AdSlot from './AdSlot';

const PrebidLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!window.pbjs) {
      console.warn('Prebid.js не загружен');
      return;
    }

    const logEvent = (eventName, data) => {
      setLogs(prevLogs => [...prevLogs, { eventName, data }]);
      console.log(eventName, data);
    };

    const events = ['bidRequested', 'bidResponse', 'bidWon', 'auctionEnd', 'noBid'];

    events.forEach(event => {
      window.pbjs.onEvent(event, data => logEvent(event, data));
    });

    return () => {
      events.forEach(event => {
        window.pbjs.offEvent(event);
      });
    };
  }, []);

  return (
    <div className="flex justify-around">
            <AdSlot slotId="ad-slot" width={300} height={250} />
                <div style={{ padding: '20px', fontFamily: 'monospace', background: '#f0f0f0', height: '100vh', overflowY: 'auto' }}>
      <h2>Prebid Events Logs</h2>
      <div>
        {logs.map((log, index) => (
          <div key={index} style={{ marginBottom: '5px', background: '#fff', padding: '5px', borderRadius: '3px' }}>
            <strong>{log.eventName}</strong>: {JSON.stringify(log.data)}
          </div>
        ))}
      </div>
    </div>
            <AdSlot slotId="ad-slot2" width={300} height={250} />
            </div> 
  );
};

export default PrebidLogs;
