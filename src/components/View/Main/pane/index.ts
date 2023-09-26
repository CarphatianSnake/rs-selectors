import NumbersLine from './numbersLine';
import { drawElement } from 'utils';
import { IPaneProps } from 'types';
import './pane.scss';

class Pane {
  public element = drawElement({ tag: 'div', classList: 'pane' });
  public editor = drawElement({ tag: 'div', classList: 'pane__window' });
  public numbersLine = new NumbersLine(this.editor);

  constructor({ name, filename }: IPaneProps) {
    this.init({ name, filename });
  }

  protected drawHeader = ({ name, filename }: IPaneProps): void => {
    const header = drawElement({ tag: 'div', classList: 'pane__header' });

    const headerName = drawElement({ tag: 'span', classList: 'pane__header__text', innerText: name });
    header.append(headerName);

    const headerFilename = drawElement({ tag: 'span', classList: 'pane__header__text', innerText: filename });
    header.append(headerFilename);

    this.element.append(header);
  };

  protected init = ({ name, filename }: IPaneProps): void => {
    this.drawHeader({ name, filename });
    this.element.append(this.editor);
    this.numbersLine.render();
  };
}

export default Pane;
