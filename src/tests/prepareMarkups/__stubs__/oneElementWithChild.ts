import { makeCodeString, drawElement } from '../../../utils';

const markup = document.createElement('div');
markup.innerHTML = '<plate><apple class="small"></apple></plate>';

const element2 = drawElement({ tag: 'div', classList: 'code-wrapper' });
element2.innerHTML = `${makeCodeString('<apple class="small" />').outerHTML}`;

const element1 = drawElement({ tag: 'div', classList: 'code-wrapper' });
element1.innerHTML = `${makeCodeString('<plate>').outerHTML}${element2.outerHTML}${
  makeCodeString('</plate>').outerHTML
}`;

const viewerMarkup = document.createElement('div');
viewerMarkup.innerHTML = `${makeCodeString('<div class="table">').outerHTML}${element1.outerHTML}${
  makeCodeString('</div>').outerHTML
}`;

const ONE_ELEMENT_WITH_CHILD = {
  markup,
  data: {
    viewerMarkup,
    levelMarkups: [
      [markup.children[0].children[0], element2],
      [markup.children[0], element1],
    ],
  },
};

export default ONE_ELEMENT_WITH_CHILD;
