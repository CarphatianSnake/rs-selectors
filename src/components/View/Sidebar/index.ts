import { drawElement } from 'utils';
import { DrawLevels, MarkLevel } from 'types';
import './sidebar.scss';

class Sidebar {
  public element = drawElement({ tag: 'aside', classList: 'sidebar' });
  public levelsContainer = drawElement({ tag: 'ul', classList: 'levels' });
  public resetButton = drawElement({ tag: 'button', classList: 'reset-progress-btn', innerText: 'Reset Progress' });
  private levelsList: HTMLLIElement[] = [];

  constructor() {
    this.init();
  }

  public drawLevels: DrawLevels = (data, progressData) => {
    data.forEach((item, i) => {
      const levelClasses = ['levels__item'];

      if (progressData[i]) {
        levelClasses.push(`levels__item_${progressData[i]}`);
      }

      const listItem = drawElement({ tag: 'li', classList: levelClasses });
      const levelNumber = drawElement({ tag: 'span', classList: 'levels__item__number', innerText: `${i + 1}` });
      listItem.append(levelNumber);
      const levelName = drawElement({ tag: 'span', classList: 'levels__item__name', innerText: item.name });
      listItem.append(levelName);
      this.levelsList.push(listItem);
      this.levelsContainer.append(listItem);
    });
  };

  public setCurrentLevel = (level: number): void => {
    this.levelsList.forEach((lvl) => {
      lvl.classList.remove('levels__item_current');
    });
    this.levelsList[level].classList.add('levels__item_current');
  };

  public markLevel: MarkLevel = (status, level) => {
    this.levelsList[level].classList.add(`levels__item_${status}`);
  };

  public unmarkLevels = (): void => {
    this.levelsList.forEach((level) => {
      level.classList.remove('levels__item_done', 'levels__item_helped');
    });
  };

  private init = (): void => {
    const { element, levelsContainer, resetButton } = this;
    const heading = drawElement({ tag: 'h2', classList: 'levels-heading', innerText: 'Choose a level' });
    element.append(heading);
    element.append(levelsContainer);
    element.append(resetButton);
  };
}

export default Sidebar;
