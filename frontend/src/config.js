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

  winnerScreenDisplayTime: 5000,
};

export default config;
