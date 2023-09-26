import { isHTMLElement } from '.';
import { OnMouseEventCallback } from 'types';

const onMouseEvent = (e: MouseEvent, callback: OnMouseEventCallback): void => {
  let { target } = e;
  const { currentTarget } = e;

  while (target !== currentTarget) {
    if (isHTMLElement(target)) {
      if (callback(target, currentTarget)) {
        return;
      }

      target = target.parentNode;
    }
  }
};

export default onMouseEvent;
