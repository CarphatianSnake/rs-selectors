import { TIMEOUT } from 'utils/constants';
import { OnHelpButton, LevelStatus } from 'types';
import tasksData from 'data';

const onHelpButton: OnHelpButton = (e, game) => {
  e.preventDefault();
  const { table, storage, cssEditor } = game;
  const winHeading = table.element.querySelector('.table__win-heading');

  if (!winHeading) {
    const { selector } = tasksData[storage.level];
    game.blockHandlers(TIMEOUT * selector.length);
    cssEditor.typeText(selector);
    game.changeLevelStatus(LevelStatus.HELPED);
  }
};

export default onHelpButton;
