import { OnResize, UpdateLine } from 'types';

const onResize: OnResize = ({ htmlViewer, cssEditor }, modalController) => {
  const updateLine: UpdateLine = (lineObject) => {
    const { line, prevHeight, update } = lineObject;
    if (line.clientHeight !== prevHeight) {
      update();
    }
  };

  updateLine(cssEditor.numbersLine);
  updateLine(htmlViewer.numbersLine);

  if (window.matchMedia('(min-width: 1024px)').matches) {
    modalController.close();
  }
};

export default onResize;
