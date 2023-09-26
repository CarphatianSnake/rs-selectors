import { drawElement } from 'utils';
import { IDrawElementProps } from 'types';
import './footer.scss';

class Footer {
  public element: HTMLElement;

  constructor() {
    this.element = drawElement({ tag: 'footer', classList: 'footer' });
    this.init();
  }

  private drawLogo = (): void => {
    const options: IDrawElementProps<'a'> = {
      tag: 'a',
      classList: 'rs-logo',
      attributes: [
        {
          name: 'href',
          value: 'https://rs.school/js/',
        },
        {
          name: 'target',
          value: '__blank',
        },
        {
          name: 'title',
          value: 'RS School JS Course',
        },
      ],
    };
    const rsLogo = drawElement(options);
    this.element.append(rsLogo);
  };

  private drawAuthor = (): void => {
    const author = drawElement({ tag: 'div', classList: 'author' });
    this.element.append(author);

    const madeBy = drawElement({ tag: 'div' });

    const madeByText = drawElement({ tag: 'span', innerText: 'Made by' });
    madeBy.append(madeByText);

    const authorGitHubOptions: IDrawElementProps<'a'> = {
      tag: 'a',
      classList: 'author__github',
      innerText: 'CarphatianSnake',
      attributes: [
        {
          name: 'href',
          value: 'https://github.com/CarphatianSnake/',
        },
        {
          name: 'title',
          value: 'CarphatianSnake Github',
        },
        {
          name: 'target',
          value: '__blank',
        },
      ],
    };
    const authorGithub = drawElement(authorGitHubOptions);
    madeBy.append(authorGithub);

    author.append(madeBy);

    const year = drawElement({ tag: 'div', innerText: '2023' });
    author.append(year);
  };

  private init = (): void => {
    this.drawLogo();
    this.drawAuthor();
  };
}

export default Footer;
