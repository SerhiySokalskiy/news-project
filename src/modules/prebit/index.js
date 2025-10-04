function loadScript(src) {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) return resolve();
		const script = document.createElement("script");
		script.src = src;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(`Failed to load script: ${src}`);
		document.head.appendChild(script);
	});
}

function triggerEvent(eventName, detail) {
	window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

function refreshAds(adUnits) {
	if (!window.pbjs) return;
	pbjs.que.push(() => {
		pbjs.requestBids({
			bidsBackHandler: () => {
				triggerEvent("auctionEnd", { adUnits });

				adUnits.forEach((unit) => {
					const bids = pbjs.getHighestCpmBids(unit.code);
					if (bids.length > 0) {
						const iframe = document.getElementById(unit.code);
						if (!iframe) return;
						const doc = iframe.contentWindow?.document;
						if (doc) pbjs.renderAd(doc, bids[0].adId);
					}
				});
			},
			timeout: 1000,
		});
	});
}

function setupUrlChangeListener(adUnits) {
	const origPushState = history.pushState;
	history.pushState = function () {
		origPushState.apply(this, _arguments);
		refreshAds(adUnits);
	};

	const origReplaceState = history.replaceState;
	history.replaceState = function () {
		origReplaceState.apply(this, _arguments);
		refreshAds(adUnits);
	};

	window.addEventListener("popstate", () => refreshAds(adUnits));
}

async function main() {
	await loadScript("/prebid10.11.0.js");

	const adUnits = [
		{
			code: "ad-slot",
			mediaTypes: {
				banner: {
					sizes: [
						[300, 250],
						[300, 600],
					],
				},
			},
			bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		},
		{
			code: "ad-slot2",
			mediaTypes: { banner: { sizes: [[300, 250]] } },
			bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		},
	];

	window.pbjs = window.pbjs || {};
	pbjs.que = pbjs.que || [];

	triggerEvent("load_ad_module", { adUnits });

	pbjs.que.push(() => {
		triggerEvent("auctionInit", { adUnits });
		pbjs.addAdUnits(adUnits);

		setTimeout(() => {
			triggerEvent("bidRequested", { adUnits });
			refreshAds(adUnits);
		}, 500);
	});

	setupUrlChangeListener(adUnits);

	window.dispatchEvent(
		new CustomEvent("prebid-ready", {
			detail: { moduleId: "prebid10.11.0" },
		}),
	);
}

main();
