import { DrawElement } from 'types';

const drawElement: DrawElement = ({ tag, classList, attributes, innerText }) => {
  const element = document.createElement(tag);

  if (classList) {
    if (Array.isArray(classList)) {
      element.classList.add(...classList);
    } else {
      element.classList.add(classList);
    }
  }

  if (attributes) {
    if (Array.isArray(attributes)) {
      attributes.forEach(({ name, value }) => {
        element.setAttribute(name, value);
      });
    } else {
      element.setAttribute(attributes.name, attributes.value);
    }
  }

  if (innerText) {
    element.innerText = innerText;
  }

  return element;
};

export default drawElement;
