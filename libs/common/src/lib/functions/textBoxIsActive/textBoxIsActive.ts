

/**
 * Detects if a text input field is in focus to prevent other key actions
 */

export function textBoxIsActive(): boolean {
    const el: any = document.activeElement;
    return ['INPUT', 'TEXTAREA'].includes(el.tagName)
      && /^(?:text|email|number|search|tel|url|password|textarea)$/i.test(el.type);
}
