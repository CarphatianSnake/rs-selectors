import { pxToNumber, drawElement } from 'utils';
import './numbersLine.scss';

class NumbersLine {
  public line = drawElement({ tag: 'div', classList: 'pane__window__numbers' });
  private parent: HTMLDivElement;
  public prevHeight = 0;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
  }

  public update = (): void => {
    const elementHeight = this.line.clientHeight;
    const { paddingTop, paddingBottom, lineHeight } = window.getComputedStyle(this.line);
    const numbersCount = Math.floor(
      (elementHeight - pxToNumber(paddingBottom) - pxToNumber(paddingTop)) / pxToNumber(lineHeight),
    );

    this.line.innerHTML = '';

    for (let i = 1; i <= numbersCount; i += 1) {
      this.line.innerHTML += `${i}<br>`;
    }
  };

  public render = (): void => {
    this.parent.append(this.line);
    this.update();
  };
}

export default NumbersLine;
