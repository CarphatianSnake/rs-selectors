import { drawElement } from '../../../utils';
import { TIMEOUT } from '../../../utils/constants';

class ModalController {
  public modalBackground = drawElement({ tag: 'div', classList: ['modal-background', 'opacity-zero'] });
  public isOpen = false;
  private wrapper: HTMLDivElement;
  private sidebar: HTMLElement;
  private button: HTMLButtonElement;

  constructor(wrapper: HTMLDivElement, sidebar: HTMLElement, button: HTMLButtonElement) {
    this.wrapper = wrapper;
    this.sidebar = sidebar;
    this.button = button;
  }

  private toggleStyles = (): void => {
    this.button.classList.toggle('modal-button_show', this.isOpen);
    this.sidebar.classList.toggle('sidebar_show', this.isOpen);
    this.wrapper.classList.toggle('wrapper_block-scroll', this.isOpen);
  };

  public open = (): void => {
    const SHORT_TIMEOUT = 15;
    this.isOpen = true;

    document.body.append(this.modalBackground);
    this.toggleStyles();

    setTimeout(() => {
      this.modalBackground.classList.remove('opacity-zero');
    }, SHORT_TIMEOUT);
  };

  public close = (): void => {
    this.isOpen = false;
    this.modalBackground.classList.add('opacity-zero');
    this.toggleStyles();

    setTimeout(() => {
      this.modalBackground.remove();
    }, TIMEOUT);
  };

  public buttonClick = (): void => {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };
}

export default ModalController;
