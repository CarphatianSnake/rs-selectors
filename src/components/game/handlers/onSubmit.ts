import onHelpButton from './onHelpButton';
import { checkLevel } from 'utils';
import { TIMEOUT, DOUBLE_TIMEOUT } from 'utils/constants';
import { OnSubmit, LevelStatus } from 'types';
import tasksData from 'data';

const onSubmit: OnSubmit = (e, game) => {
  e.preventDefault();

  const { cssEditor, storage, htmlViewer, table, taskHeading } = game;

  const { input } = cssEditor;
  if (!game.block) {
    const answer = input.value;

    if (answer === '--help') {
      onHelpButton(e, game);
      return;
    }

    const answerElements = [...table.getElementsBySelector(answer)];
    const answerElementsCount = answerElements.length;
    const correctAnswerElements = table.getElementsBySelector(tasksData[storage.level].selector);
    const correctAnswerElementsCount = correctAnswerElements.length;
    const isCorrect = answerElements.every((element) => element.classList.contains('animate'));

    if (answerElementsCount === correctAnswerElementsCount && isCorrect && answer !== '.animated') {
      game.blockHandlers(DOUBLE_TIMEOUT);
      table.onCorrectAnswer(answerElements);
      cssEditor.onCorrectAnswer();
      game.changeLevelStatus(LevelStatus.DONE);

      const totalLevels = tasksData.length;
      const lastLevel = totalLevels - 1;
      const isAllLevelsCompleted = storage.progress.filter((item) => item).length === totalLevels;

      setTimeout(() => {
        if (isAllLevelsCompleted) {
          htmlViewer.onWin();
          taskHeading.onWin();
          table.onWin(storage.progress);
        } else {
          if (storage.level === lastLevel) {
            storage.setLevel = checkLevel(storage.progress.indexOf(null));
          } else {
            storage.setLevel = checkLevel(storage.level + 1);
          }
          game.updateLevel();
        }
      }, TIMEOUT);
    } else {
      const { editor } = game.view.main;
      game.blockHandlers(TIMEOUT);
      editor.classList.add('editor_shake');

      setTimeout(() => {
        editor.classList.remove('editor_shake');
        input.focus();
      }, TIMEOUT);
    }
  }
};

export default onSubmit;
