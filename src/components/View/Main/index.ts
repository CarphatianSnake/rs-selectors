import TaskHeading from './taskHeading';
import Table from './table';
import CssEditor from './pane/cssEditor';
import HtmlViewer from './pane/htmlViewer';
import { drawElement } from 'utils';
import './main.scss';

class Main {
  public element: HTMLElement;
  public taskHeading = new TaskHeading();
  public table = new Table();
  public editor = drawElement({ tag: 'section', classList: 'editor' });
  public cssEditor = new CssEditor();
  public htmlViewer = new HtmlViewer();
  public container = drawElement({ tag: 'div', classList: 'table-container' });
  public tableWrapper = drawElement({ tag: 'div', classList: 'table-wrapper' });

  constructor() {
    this.element = drawElement({ tag: 'main', classList: 'main' });
    this.init();
  }

  private drawTask = (): void => {
    const { element, container, tableWrapper, taskHeading } = this;
    const task = drawElement({ tag: 'section', classList: 'task' });
    const tableEdge = drawElement({ tag: 'div', classList: 'table-edge' });
    const tableSurface = drawElement({ tag: 'div', classList: 'table-surface' });

    element.append(task);
    task.append(taskHeading.element);
    task.append(container);
    container.append(this.table.helper);
    container.append(this.tableWrapper);
    tableWrapper.append(tableSurface);
    tableWrapper.append(this.table.element);
    container.append(tableEdge);

    for (let i = 0; i < 2; i += 1) {
      const tableLeg = drawElement({ tag: 'div', classList: 'table-leg' });
      tableEdge.append(tableLeg);
    }
  };

  private drawEditor = (): void => {
    const { element, editor, cssEditor, htmlViewer } = this;
    element.append(editor);
    editor.append(cssEditor.element);
    editor.append(htmlViewer.element);
  };

  private init = (): void => {
    this.drawTask();
    this.drawEditor();
  };
}

export default Main;
