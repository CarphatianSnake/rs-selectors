import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);

import Pane from '..';
import { capitalize, drawElement, isTextAreaElement } from 'utils';
import { TIMEOUT } from 'utils/constants';
import { IDrawElementProps, ButtonNames, DrawCssEditorButton } from 'types';
import './cssEditor.scss';

class CssEditor extends Pane {
  public input: HTMLTextAreaElement;
  public enterButton: HTMLButtonElement;
  public helpButton: HTMLButtonElement;
  public form = drawElement({ tag: 'form', classList: 'css-form' });
  private inputAlternate = drawElement({ tag: 'div', classList: ['language-css', 'input_strobe'] });

  constructor() {
    super({ name: 'CSS Editor', filename: 'style.css' });
    this.input = this.drawTextarea();
    this.enterButton = this.drawButton(ButtonNames.ENTER);
    this.helpButton = this.drawButton(ButtonNames.HELP);
    this.drawForm();
  }

  private drawButton: DrawCssEditorButton = (btnName) => {
    const options: IDrawElementProps<'button'> = {
      tag: 'button',
      classList: ['css-form__button', `css-form__button__${btnName}`],
      innerText: capitalize(btnName),
    };
    return drawElement(options);
  };

  private drawTextarea = (): HTMLTextAreaElement => {
    const { form, inputAlternate } = this;

    const placeholder = 'Type here';
    const options: IDrawElementProps<'textarea'> = {
      tag: 'textarea',
      classList: 'css-form__input',
      attributes: [
        {
          name: 'placeholder',
          value: placeholder,
        },
        {
          name: 'id',
          value: 'cssInput',
        },
        {
          name: 'maxlength',
          value: '100',
        },
        {
          name: 'autofocus',
          value: '',
        },
      ],
    };

    const textarea = drawElement(options);

    form.append(textarea);
    form.append(inputAlternate);

    textarea.addEventListener('input', ({ target }) => {
      if (isTextAreaElement(target)) {
        inputAlternate.classList.toggle('input_strobe', !target.value);
        inputAlternate.innerText = target.value;
        hljs.highlightElement(inputAlternate);
      }
    });

    return textarea;
  };

  public clearInput = (): void => {
    const { input, inputAlternate } = this;

    input.value = '';
    inputAlternate.innerText = '';
    inputAlternate.classList.remove('correct');
    setTimeout(() => {
      inputAlternate.classList.add('input_strobe');
    }, TIMEOUT);
  };

  public typeText = (text: string): void => {
    const { input, inputAlternate } = this;
    let i = 0;

    this.clearInput();
    input.value = ' ';
    const typing = setInterval(() => {
      if (!i) {
        inputAlternate.classList.remove('input_strobe');
        input.value = '';
      }
      input.value += text[i];
      inputAlternate.innerText += text[i];
      hljs.highlightElement(inputAlternate);
      i += 1;
      if (i >= text.length) {
        clearInterval(typing);
        input.focus();
      }
    }, TIMEOUT);
  };

  private drawForm = (): void => {
    const { enterButton, helpButton, form, input, editor } = this;
    const buttonsContainer = drawElement({ tag: 'div', classList: 'css-form__buttons-container' });

    buttonsContainer.append(enterButton);
    buttonsContainer.append(helpButton);

    form.append(buttonsContainer);

    const labelText =
      '{\n  /* Type CSS selectors inside this editor. */\n}\n\n{\n  /* Press "Help" button or type "--help" to see the answer.\n\n  *Note: if you use help option,\n  the task will be marked as "helped" */\n}';

    const label = drawElement({
      tag: 'label',
      classList: 'css-form__label',
      innerText: labelText,
      attributes: {
        name: 'for',
        value: 'cssInput',
      },
    });

    form.append(label);

    form.addEventListener('click', () => {
      input.focus();
    });

    editor.append(this.form);
  };

  public updateLine = (): void => {
    setTimeout(() => {
      this.numbersLine.update();
    }, TIMEOUT);
  };

  public onCorrectAnswer = (): void => {
    this.inputAlternate.classList.add('correct');
    setTimeout(() => {
      this.clearInput();
      this.input.focus();
    }, TIMEOUT);
  };
}

export default CssEditor;
