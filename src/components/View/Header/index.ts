import { drawElement } from 'utils';
import './header.scss';

class Header {
  public element: HTMLElement;

  constructor() {
    this.element = drawElement({ tag: 'header', classList: 'header' });
    this.init();
  }

  private init = (): void => {
    const logo = drawElement({ tag: 'div', classList: 'logo' });
    const logoIcon = drawElement({ tag: 'div', classList: 'logo__icon' });
    logo.append(logoIcon);
    const logoText = drawElement({ tag: 'span', innerText: 'CSS Diner' });
    logo.append(logoText);
    this.element.append(logo);
  };
}

export default Header;
