import '../../public/prebid10.10.0.js';
import { adUnits } from './config.js';

window.pbjs = window.pbjs || {};
window.pbjs.que = window.pbjs.que || [];

export function requestAd(slotId) {
  if (!window.pbjs) return;

  window.pbjs.que.push(() => {
    window.pbjs.addAdUnits(adUnits);

    window.pbjs.onEvent('bidResponse', (bid) => {
      if (bid.adUnitCode !== slotId) return;

      const iframe = document.getElementById(slotId);
      if (!iframe?.contentWindow) return;

      const doc = iframe.contentWindow.document;
      try {
        window.pbjs.renderAd(doc, bid.adId);
      } catch (e) {
        console.error('Render error', e);
      }
    });

    window.pbjs.onEvent('bidWon', (bid) => {
      if (bid.adUnitCode === slotId) {
        console.log('bidWon', bid);
      }
    });

    window.pbjs.requestBids({ timeout: 2000 });
  });
}
