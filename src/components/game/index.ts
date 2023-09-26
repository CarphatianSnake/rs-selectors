import AppView from 'components/View';
import StorageController from 'game/storageController';
import HandlersController from 'game/handlers';
import { prepareMarkups } from 'utils';
import { TIMEOUT } from 'utils/constants';
import { LevelStatus } from 'types';
import tasksData from 'data';

class Game {
  public view = new AppView();
  public table = this.view.main.table;
  public helper = this.table.helper;
  public cssEditor = this.view.main.cssEditor;
  public htmlViewer = this.view.main.htmlViewer;
  public taskHeading = this.view.main.taskHeading;
  public sidebar = this.view.sidebar;
  public resetButton = this.view.sidebar.resetButton;
  public block = false;
  public levelMarkups: [HTMLElement, HTMLDivElement][] = [];
  public storage = new StorageController();
  private handlers = new HandlersController(this);

  constructor() {
    this.init();
  }

  public changeLevelStatus = (status: LevelStatus): void => {
    const { storage, sidebar } = this;
    const currentProgress = storage.progress[storage.level];
    const isHelped = status === LevelStatus.HELPED && currentProgress !== LevelStatus.DONE;
    const isDone = status === LevelStatus.DONE && currentProgress !== LevelStatus.HELPED;

    if (isHelped || isDone) {
      storage.setProgress(storage.level, status);
      sidebar.markLevel(status, storage.level);
    }
  };

  public blockHandlers = (timeout: number): void => {
    const disableElements = (isDisabled: boolean): void => {
      const { input, helpButton } = this.cssEditor;
      const { resetButton } = this.sidebar;
      const elements = [input, helpButton, resetButton];

      this.block = isDisabled;

      elements.forEach((element) => {
        element.toggleAttribute('disabled', isDisabled);
      });
    };

    disableElements(true);

    setTimeout(() => disableElements(false), timeout);
  };

  public updateLevel = (): void => {
    const { htmlViewer, cssEditor, sidebar, table, taskHeading, storage } = this;
    const { markup, task, selector } = tasksData[storage.level];
    sidebar.setCurrentLevel(storage.level);
    taskHeading.update(task);

    const tableMarkup = document.createElement('div');
    tableMarkup.innerHTML = markup;

    const { viewerMarkup, levelMarkups } = prepareMarkups(tableMarkup);
    this.levelMarkups = levelMarkups;

    htmlViewer.update(viewerMarkup);
    cssEditor.updateLine();
    table.update(tableMarkup, selector);
    setTimeout(() => {
      cssEditor.input.focus();
    }, TIMEOUT);
  };

  private init = (): void => {
    this.sidebar.drawLevels(tasksData, this.storage.progress);
    this.updateLevel();
    this.handlers.init();
  };
}

export default Game;
