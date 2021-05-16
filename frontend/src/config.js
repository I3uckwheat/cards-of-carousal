const config = {
  maxPlayers: {
    min: 2,
    max: 12,
    default: 8,
  },

  winningScore: {
    min: 1,
    max: 15,
    default: 7,
  },

  initialSelectedPack: [0],

  handSize: 10,

  winnerScreenDisplayTime: 3000,

  carouselRotationInterval: 60000,

  breakpoint: {
    playerBreakpoints: {
      smallMobile: '312px',
      largeMobile: '600px',
      smallDesktop: '1600px',
      largeDesktop: '3200px',
    },

    hostBreakpoints: {
      smallDesktop: '680px',
      largeDesktop: '1600px',
      extraLargDesktop: '3200px',
    },
  },
};

export default config;
