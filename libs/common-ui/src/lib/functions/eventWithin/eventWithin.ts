/**
 * @description Determines if an event is contained within an HTML
 * Element (good for click outside type actins)
 * @param {Event} event
 * @param {Element[]} elements
 */

export const eventWithin = (event: Event, elements: Element[]): boolean =>
  elements.some((el) => el.contains(<Node>event.target))
