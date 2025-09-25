
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function main() {
  await loadScript('../../public/prebid10.10.0');
  const adUnits = [
    {
      code: "ad-slot",
      mediaTypes: { banner: { sizes: [[300, 250], [300, 600]] } },
      bids: [
        {
          bidder: "adtelligent",
          params: {
            aid: 350975,
          },
        },
      ],
    },
    {
      code: "ad-slot2",
      mediaTypes: { banner: { sizes: [[300, 250]] } },
      bids: [
        {
          bidder: "adtelligent",
          params: {
            aid: 350975,
          },
        },
      ],
    },
  ];

  window.pbjs = window.pbjs || {};
  pbjs.que = pbjs.que || [];

  pbjs.que.push(function () {
    pbjs.addAdUnits(adUnits);

    setTimeout(() => {
      pbjs.requestBids({
        bidsBackHandler: () => {
          adUnits.forEach(unit => {
            const bids = pbjs.getHighestCpmBids(unit.code);
            if (bids.length > 0) {
              const iframe = document.getElementById(unit.code);
              if (!iframe) return;
              const doc = iframe.contentWindow.document;
              pbjs.renderAd(doc, bids[0].adId);
            }
          });
        },
        timeout: 1000
      });
    }, 500);
  });
  window.dispatchEvent(new Event('prebid-ready'));
}

main()