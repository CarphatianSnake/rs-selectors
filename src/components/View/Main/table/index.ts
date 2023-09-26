import { drawElement } from 'utils';
import { TIMEOUT } from 'utils/constants';
import { ProgressData, UpdateTable, LevelStatus } from 'types';
import './table.scss';

class Table {
  public element = drawElement({ tag: 'div', classList: 'table' });
  public helper = drawElement({ tag: 'div', classList: 'helper' });

  public getElementsBySelector = (selector: string): NodeListOf<HTMLElement> | never[] => {
    try {
      return this.element.querySelectorAll<HTMLElement>(selector);
    } catch (err) {
      return [];
    }
  };

  public onCorrectAnswer = (elements: HTMLElement[]): void => {
    elements.forEach((element) => {
      element.classList.remove('animate');
      element.classList.add('move');
    });
  };

  private onTransition = (callback: () => void): void => {
    this.element.classList.add('opacity-zero');
    setTimeout(callback, TIMEOUT);
  };

  public onWin = (progress: ProgressData[]): void => {
    const wrapper = document.createElement('div');
    const heading = drawElement({ tag: 'h2', classList: 'table__win-heading', innerText: 'You did it!' });
    const text = drawElement({ tag: 'p', classList: 'table__win-text' });
    const done = progress.filter((item) => item === LevelStatus.DONE).length;
    const helped = progress.filter((item) => item === LevelStatus.HELPED).length;

    if (done === progress.length) {
      text.innerText = `You rock at CSS!\nYou solved all the tasks.`;
    } else if (helped === progress.length) {
      text.innerText = 'You got help for all the tasks.';
    } else {
      text.innerText = `You solved ${done} tasks\nand asked for help with ${helped} tasks.`;
    }

    this.onTransition(() => {
      this.element.innerHTML = '';
      wrapper.append(heading);
      wrapper.append(text);
      this.element.append(wrapper);
      this.element.classList.remove('opacity-zero');
    });
  };

  public update: UpdateTable = (markup, selector) => {
    this.onTransition(() => {
      this.element.innerHTML = '';
      this.element.append(...markup.children);
      const targets = this.element.querySelectorAll<HTMLElement>(selector);
      targets.forEach((target) => {
        target.classList.add('animate');
      });
      this.element.classList.remove('opacity-zero');
    });
  };
}

export default Table;
