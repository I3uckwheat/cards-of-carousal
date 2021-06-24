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
      smallMobileWidth: '312px',
      largeMobileWidth: '600px',
      smallDesktopWidth: '1600px',
      largeDesktopWidth: '3200px',
    },

    hostBreakpoints: {
      smallDesktopWidth: '680px',
      largeDesktopWidth: '1600px',
      extraLargeDesktopWidth: '3200px',

      smallDesktopHeight: '550px',
    },
  },
};

export default config;
