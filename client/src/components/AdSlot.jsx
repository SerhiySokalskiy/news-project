import { useEffect, useState } from 'react';

const AdSlot = ({ slotId, width = 300, height = 250 }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_ADS === 'true') {
      setEnabled(true);

      import('../prebit/index').then((module) => {
        module.requestAd(slotId);
      }).catch(err => console.error('Prebid import error', err));
    }
  }, [slotId]);

  if (!enabled) return null;

  return (
    <iframe
      id={slotId}
      title={slotId}
      style={{ width, height, border: 'none', overflow: "hidden" }}
      scrolling='no'
    />
  );
};

export default AdSlot;
