import Pane from '..';
import { TIMEOUT } from 'utils/constants';
import { drawElement } from 'utils';
import './htmlViewer.scss';

class HtmlViewer extends Pane {
  private markup = drawElement({ tag: 'div', classList: 'markup' });

  constructor() {
    super({ name: 'HTML Viewer', filename: 'table.html' });
    this.draw();
  }

  public update = (markup: HTMLDivElement): void => {
    this.markup.classList.add('opacity-zero');

    setTimeout(() => {
      this.markup.childNodes[0]?.remove();
      this.markup.append(markup);
      this.numbersLine.update();
      this.markup.classList.remove('opacity-zero');
    }, TIMEOUT);
  };

  public onWin = (): void => {
    this.markup.classList.add('opacity-zero');

    setTimeout(() => {
      this.markup.childNodes[0]?.remove();
      this.numbersLine.update();
      this.markup.classList.remove('opacity-zero');
    }, TIMEOUT);
  };

  private draw = (): void => {
    const { editor, numbersLine } = this;
    editor.append(this.markup);
    numbersLine.render();
  };
}

export default HtmlViewer;
