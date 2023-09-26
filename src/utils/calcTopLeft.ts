import { isHTMLElement } from '.';
import { HelperTarget, IHelperMargins, CalcTopLeft } from 'types';

const calcTopLeft: CalcTopLeft = (target, currentTarget, helper) => {
  const HELPER_HEIGHT = 30;
  const margins: IHelperMargins = {
    top: -HELPER_HEIGHT,
    left: 0,
  };

  const calc = (target: HelperTarget): void => {
    const isTarget = isHTMLElement(target);
    const isCurrentTarget = isHTMLElement(currentTarget);

    if (isTarget && isCurrentTarget && target !== currentTarget) {
      margins.top += target.offsetTop;
      margins.left += target.offsetLeft;

      if (target.parentElement !== currentTarget) {
        calc(target.parentElement);
      }

      if (currentTarget.offsetWidth < margins.left + helper.clientWidth) {
        margins.left = currentTarget.clientWidth - helper.clientWidth;
      }
    }
  };

  calc(target);

  return margins;
};

export default calcTopLeft;
