import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('html', xml);

import drawElement from './drawElement';

const makeCodeString = (code: string): HTMLSpanElement => {
  const codeString = drawElement({ tag: 'span', classList: 'language-html', innerText: code });
  hljs.highlightElement(codeString);
  return codeString;
};

export default makeCodeString;
