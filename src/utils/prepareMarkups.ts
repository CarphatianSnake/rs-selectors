import { isHTMLElement, makeCodeString, drawElement } from '.';
import { PrepareMarkups, MarkupElement } from 'types';

const prepareMarkups: PrepareMarkups = (element) => {
  const viewerMarkup = document.createElement('div');
  const levelMarkups: [HTMLElement, HTMLDivElement][] = [];

  const markupElement: MarkupElement = (element, parent?) => {
    [...element.children].forEach((child) => {
      if (isHTMLElement(child)) {
        const viewerElement = drawElement({ tag: 'div', classList: 'code-wrapper' });
        const text = child.outerHTML;

        if (child.children.length) {
          const openTag = makeCodeString(text.slice(0, text.indexOf('>') + 1));
          viewerElement.append(openTag);

          markupElement(child, viewerElement);

          const closeTag = makeCodeString(`</${child.tagName}>`.toLowerCase());
          viewerElement.append(closeTag);

          levelMarkups.push([child, viewerElement]);
        } else {
          const selfClosingTag = makeCodeString(text.slice(0, text.indexOf('>')) + ' />');
          viewerElement.append(selfClosingTag);

          if (parent) {
            parent.append(viewerElement);
            viewerMarkup.append(parent);
          } else {
            viewerMarkup.append(viewerElement);
          }

          levelMarkups.push([child, viewerElement]);
        }
      }
    });
  };

  markupElement(element);

  viewerMarkup.prepend(makeCodeString('<div class="table">'));
  viewerMarkup.append(makeCodeString('</div>'));

  return { viewerMarkup, levelMarkups };
};

export default prepareMarkups;
