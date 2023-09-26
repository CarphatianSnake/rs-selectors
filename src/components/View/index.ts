import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { drawElement } from 'utils';
import './view.scss';

class AppView {
  private app = drawElement({ tag: 'div', classList: 'app' });
  public wrapper = drawElement({ tag: 'div', classList: 'wrapper' });
  public sidebar = new Sidebar();
  private header = new Header();
  private footer = new Footer();
  public main = new Main();
  public modalButton = drawElement({ tag: 'button', classList: 'modal-button' });

  constructor() {
    this.init();
  }

  private init = (): void => {
    document.body.append(this.app);
    this.app.append(this.wrapper);
    this.wrapper.append(this.header.element);
    this.wrapper.append(this.main.element);
    this.wrapper.append(this.footer.element);
    this.app.append(this.sidebar.element);
    this.app.append(this.modalButton);
  };
}

export default AppView;
