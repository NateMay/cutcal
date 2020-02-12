/**
 * Determines if an event is contained within an HTML Element
 * @param {Event} event
 * @param {Element[]} elements
 * @note good for click outside type actins
 */

export function eventWithin(event: Event, elements: Element[]): boolean {
  return elements.some(el => el.contains(<Node>event.target))
}
