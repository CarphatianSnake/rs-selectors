import { onMouseEvent, checkLevel } from 'utils';
import { OnMouseEventCallback, OnChooseLevel } from 'types';

const onChooseLevel: OnChooseLevel = (e, game) => {
  if (!game.block) {
    const mouseEventCallback: OnMouseEventCallback = (target) => {
      let isLevelChanged = false;
      const isCurrentLevel = target.classList.contains('levels__item_current');
      const isLevelItem = target.classList.contains('levels__item');

      if (isLevelItem && !isCurrentLevel) {
        const newLevelNumber = target.querySelector('.levels__item__number')?.textContent;
        if (newLevelNumber) {
          const dataLevelNumber = +newLevelNumber - 1;
          game.cssEditor.clearInput();
          game.storage.setLevel = checkLevel(dataLevelNumber);
          game.updateLevel();
        }
        isLevelChanged = true;
      }

      return isLevelChanged;
    };

    onMouseEvent(e, mouseEventCallback);
  }
};

export default onChooseLevel;
