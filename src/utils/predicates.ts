export const isHTMLElement = (target: EventTarget | null): target is HTMLElement => target instanceof HTMLElement;

export const isTextAreaElement = (target: EventTarget | null): target is HTMLTextAreaElement =>
  target instanceof HTMLTextAreaElement;
