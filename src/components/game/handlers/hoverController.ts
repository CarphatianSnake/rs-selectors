import Game from 'game';
import { isHTMLElement, onMouseEvent, calcTopLeft } from 'utils';
import {
  Pair,
  OnMouseEventCallback,
  OnHtmlViewerHover,
  ShowHelper,
  RemoveHelper,
  HighlightLevelPair,
  OnTableHover,
} from 'types';

class HoverController {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public showHelper: ShowHelper = (target, currentTarget) => {
    const { container, tableWrapper } = this.game.view.main;
    const { helper } = this.game.view.main.table;

    if (isHTMLElement(target) && isHTMLElement(currentTarget)) {
      const helperText = target.outerHTML
        .replace(`${target.innerHTML}`, '')
        .replace(' animate', '')
        .replace('class="animate"', '')
        .replace(' data-hovered="true"', '');
      helper.innerText = helperText;

      const outerMargin = container.offsetHeight - tableWrapper.offsetHeight;
      const { top, left } = calcTopLeft(target, currentTarget, helper);
      helper.style.left = `${left}px`;
      helper.style.top = `${top - outerMargin}px`;

      helper.classList.add('helper_show');
      target.setAttribute('data-hovered', 'true');
    }
  };

  public removeHelper: RemoveHelper = (target) => {
    if (isHTMLElement(target)) {
      const { style } = this.game.helper;
      target.removeAttribute('data-hovered');
      this.game.helper.classList.remove('helper_show');
      style.top = '0';
      style.left = '50%';
    }
  };

  public highlightLevelPair: HighlightLevelPair = (target, targetNum, pairNum, callback) => {
    const levelPair = this.game.levelMarkups.find((level) => level[targetNum] === target);
    if (levelPair) {
      callback(levelPair[pairNum]);
    }
  };

  public onTableHover: OnTableHover = ({ target, currentTarget }) => {
    const isWinElements =
      isHTMLElement(target) &&
      (target.classList.contains('table__win-heading') || target.classList.contains('table__win-text'));

    if (target !== currentTarget && !isWinElements && target !== this.game.helper) {
      this.showHelper(target, currentTarget);

      this.highlightLevelPair(target, Pair.TableElement, Pair.ViewerElement, (levelPair) => {
        levelPair.classList.add('hovered');
      });
    }
  };

  public onTableUnhover: OnTableHover = ({ target }) => {
    this.removeHelper(target);

    this.highlightLevelPair(target, Pair.TableElement, Pair.ViewerElement, (levelPair) => {
      levelPair.classList.remove('hovered');
    });
  };

  public onHtmlViewerHover: OnHtmlViewerHover = (e, callback) => {
    const mouseEventCallback: OnMouseEventCallback = (target, currentTarget) => {
      const isNotSpan = target.tagName !== 'SPAN';

      if (isNotSpan) {
        const isNotParent = target !== currentTarget;
        const isNotTableContainer = !target.parentElement?.classList.contains('markup');
        const isNotMarkupContainer = !target.classList.contains('markup');
        const isDiv = target.tagName === 'DIV';

        if (isDiv && isNotParent && isNotMarkupContainer && isNotTableContainer) {
          callback(target);
          return true;
        }
      }
      return false;
    };

    onMouseEvent(e, mouseEventCallback);
  };
}

export default HoverController;
