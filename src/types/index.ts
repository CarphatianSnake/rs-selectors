import Game from '../components/game';
import HtmlViewer from '../components/view/main/pane/htmlViewer';
import CssEditor from '../components/view/main/pane/cssEditor';
import ModalController from '../components/game/handlers/modalController';
import NumbersLine from '../components/View/Main/pane/numbersLine';

export type RenderPane = (parent: HTMLElement, props: IPaneProps) => HTMLDivElement;

export type RenderPaneHeader = (parent: HTMLDivElement, props: IPaneProps) => void;

interface ITaskData {
  markup: string;
  selector: string;
  task: string;
  name: string;
}

export type ROTaskData = Readonly<ITaskData>;
export type ROTaskDataArray = ReadonlyArray<ROTaskData>;

interface IAttribute {
  name: string;
  value: string;
}

export interface IDrawElementProps<T> {
  tag: T;
  classList?: string | string[];
  attributes?: IAttribute | IAttribute[];
  innerText?: string;
}

export type DrawElement = <K extends keyof HTMLElementTagNameMap>(
  props: IDrawElementProps<K>,
) => HTMLElementTagNameMap[K];

export interface IPaneProps {
  name: 'CSS Editor' | 'HTML Viewer';
  filename: 'style.css' | 'table.html';
}

export enum LevelStatus {
  DONE = 'done',
  HELPED = 'helped',
}

export type ProgressData = LevelStatus | null;

export interface IStorageData {
  level: number;
  progress: ProgressData[];
}

export enum Pair {
  TableElement = 0,
  ViewerElement = 1,
}

export type OnMouseEventCallback = (target: HTMLElement, currentTarget: EventTarget | null | undefined) => boolean;

export type HelperTarget = EventTarget | HTMLElement | HTMLDivElement | null;

export interface IHelperMargins {
  top: number;
  left: number;
}

export type CalcTopLeft = (
  target: HelperTarget,
  currentTarget: HelperTarget,
  element: HTMLDivElement,
) => IHelperMargins;

export type OnHtmlViewerHover = (e: MouseEvent, callback: (target: HTMLElement) => void) => void;

export type ShowHelper = (target: HelperTarget, currentTarget: HelperTarget) => void;

export type RemoveHelper = (target: EventTarget | null) => void;

export type HighlightLevelPair = (
  target: EventTarget | null,
  targetNum: Pair,
  pairNum: Pair,
  callback: (levelPair: HTMLElement) => void,
) => void;

export type OnTableHover = (e: MouseEvent) => void;

export type OnChooseLevel = (e: MouseEvent, game: Game) => void;

export type OnHelpButton = (e: MouseEvent | SubmitEvent | KeyboardEvent, game: Game) => void;

export type OnResize = (
  { htmlViewer, cssEditor }: { htmlViewer: HtmlViewer; cssEditor: CssEditor },
  modalController: ModalController,
) => void;

export type UpdateLine = (lineObject: NumbersLine) => void;

export type OnSubmit = (e: SubmitEvent | KeyboardEvent, game: Game) => void;

export type SetProgress = (currentLevel: number, status: ProgressData) => void;

export type DrawLevels = (data: ROTaskDataArray, progressData: ProgressData[]) => void;

export type MarkLevel = (status: LevelStatus, level: number) => void;

export type UpdateTable = (markup: HTMLDivElement, selector: string) => void;

export enum ButtonNames {
  ENTER = 'enter',
  HELP = 'help',
}

export type DrawCssEditorButton = (btnName: ButtonNames) => HTMLButtonElement;

export type PrepareMarkups = (element: HTMLDivElement) => {
  viewerMarkup: HTMLDivElement;
  levelMarkups: [HTMLElement, HTMLDivElement][];
};

export type MarkupElement = (element: HTMLElement, parent?: HTMLDivElement) => void;
