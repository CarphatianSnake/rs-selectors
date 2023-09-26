import Game from 'game';
import HoverController from './hoverController';
import onChooseLevel from './onChooseLevel';
import onHelpButton from './onHelpButton';
import onResetProgress from './onResetProgress';
import onSubmit from './onSubmit';
import onResize from './onResize';
import ModalController from './modalController';
import { Pair } from 'types';

class HandlersController {
  private game: Game;
  private hoverController: HoverController;
  private modalController: ModalController;

  constructor(game: Game) {
    this.game = game;
    this.hoverController = new HoverController(game);
    this.modalController = new ModalController(
      this.game.view.wrapper,
      this.game.view.sidebar.element,
      this.game.view.modalButton,
    );
  }

  private chooseLevelHandler = (): void => {
    this.game.sidebar.levelsContainer.addEventListener('click', (e) => {
      onChooseLevel(e, this.game);
      this.modalController.close();
    });
  };

  private resetProgressHandler = (): void => {
    this.game.resetButton.addEventListener('click', () => onResetProgress(this.game));
  };

  private inputValueHandler = (): void => {
    const { enterButton, form, input } = this.game.cssEditor;

    form.addEventListener('submit', (e) => onSubmit(e, this.game));

    input.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault();
        const SHORT_TIMEOUT = 100;
        onSubmit(e, this.game);
        enterButton.classList.add('css-form__button_pressed');
        setTimeout(() => {
          enterButton.classList.remove('css-form__button_pressed');
        }, SHORT_TIMEOUT);
      }
    });
  };

  private helpButtonHandler = (): void => {
    const { helpButton } = this.game.cssEditor;
    helpButton.addEventListener('keydown', (e) => e.preventDefault());
    helpButton.addEventListener('click', (e) => onHelpButton(e, this.game));
  };

  private tableHoverHandler = (): void => {
    const { onTableHover, onTableUnhover } = this.hoverController;
    const table = this.game.table.element;
    table.addEventListener('mouseover', onTableHover);
    table.addEventListener('mouseout', onTableUnhover);
  };

  private htmlViewerHandler = (): void => {
    const { htmlViewer, table } = this.game;
    const { onHtmlViewerHover, highlightLevelPair, removeHelper } = this.hoverController;
    const { ViewerElement, TableElement } = Pair;

    htmlViewer.editor.addEventListener('mouseover', (e) => {
      onHtmlViewerHover(e, (target) => {
        target.classList.add('hovered');

        highlightLevelPair(target, ViewerElement, TableElement, (levelPair) => {
          levelPair.setAttribute('data-hovered', 'true');
          this.hoverController.showHelper(levelPair, table.element);
        });
      });
    });

    htmlViewer.editor.addEventListener('mouseout', (e) => {
      onHtmlViewerHover(e, (target) => {
        target.classList.remove('hovered');

        highlightLevelPair(target, ViewerElement, TableElement, (levelPair) => {
          levelPair.removeAttribute('data-hovered');
          removeHelper(target);
        });
      });
    });
  };

  private modalButtonHandler = (): void => {
    this.game.view.modalButton.addEventListener('click', this.modalController.buttonClick);
    this.modalController.modalBackground.addEventListener('click', this.modalController.close);
  };

  private resizeHandler = (): void => {
    window.addEventListener('resize', () => {
      const { cssEditor, htmlViewer } = this.game.view.main;
      onResize({ cssEditor, htmlViewer }, this.modalController);
    });
  };

  public init = (): void => {
    this.chooseLevelHandler();
    this.helpButtonHandler();
    this.resetProgressHandler();
    this.inputValueHandler();
    this.tableHoverHandler();
    this.tableHoverHandler();
    this.htmlViewerHandler();
    this.modalButtonHandler();
    this.resizeHandler();
  };
}

export default HandlersController;
