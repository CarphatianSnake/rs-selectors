import { drawElement } from 'utils';
import './taskHeading.scss';

class TaskHeading {
  public element: HTMLHeadingElement;

  constructor() {
    this.element = drawElement({ tag: 'h2', classList: 'task-heading' });
  }

  public update = (text: string): void => {
    this.element.innerText = text;
  };

  public onWin = (): void => {
    this.update('Congratulations!');
  };
}

export default TaskHeading;
