import { makeCodeString, drawElement } from '../../../utils';

const markup = document.createElement('div');
markup.innerHTML = '<div class="apple"></div>';

const element = drawElement({ tag: 'div', classList: 'code-wrapper' });
element.innerHTML = `${makeCodeString('<div class="apple" />').outerHTML}`;

const viewerMarkup = document.createElement('div');
viewerMarkup.innerHTML = `${makeCodeString('<div class="table">').outerHTML}${element.outerHTML}${
  makeCodeString('</div>').outerHTML
}`;

const ONE_ELEMENT = {
  markup,
  data: {
    viewerMarkup,
    levelMarkups: [[markup.children[0], element]],
  },
};

export default ONE_ELEMENT;
