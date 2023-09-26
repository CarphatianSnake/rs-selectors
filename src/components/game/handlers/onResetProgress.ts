import Game from 'game';

const onResetProgress = (game: Game): void => {
  game.storage.resetData();
  game.sidebar.unmarkLevels();
  game.updateLevel();
};

export default onResetProgress;
