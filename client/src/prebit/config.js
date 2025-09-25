export const adUnits = [
  {
    code: 'ad-slot',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300, 600]]
      }
    },
    bids: [
      {
        bidder: 'adtelligent',
        params: {
          aid: 350975
        }
      }
    ]
  },
  {
    code: 'ad-slot2',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300, 600]]
      }
    },
    bids: [{
          bidder: 'bidmatic',
          params: {
            source: 886409
          }
        }]
  }
];
