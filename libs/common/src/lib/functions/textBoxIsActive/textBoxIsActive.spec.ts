import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getEl } from '@cutcal/ng-testing';
import { textBoxIsActive } from './textBoxIsActive';

@Component({
  template: `
    <input id="text" />
    <input id="email" type="email" />
    <input id="number" type="number" />
    <input id="search" type="search" />
    <input id="tel" type="tel" />
    <input id="url" type="url" />
    <input id="password" type="password" />
    <textarea></textarea>
    <button>BTN</button>
    <input id="checkbox" type="checkbox" />
    <input id="radio" type="radio" />
    <input id="submit" type="submit" />
  `,
})
class TestTextBoxActiveComponent {}

describe('textBoxIsActive() - shared/functions', () => {
  let fixture: ComponentFixture<TestTextBoxActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestTextBoxActiveComponent],
    });

    fixture = TestBed.createComponent(TestTextBoxActiveComponent);
    fixture.detectChanges();
  });

  it('should return true for input type="text" elements', () => {
    getEl<HTMLInputElement>(fixture, '#text').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="email" elements', () => {
    getEl<HTMLInputElement>(fixture, '#email').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="number" elements', () => {
    getEl<HTMLInputElement>(fixture, '#number').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="search" elements', () => {
    getEl<HTMLInputElement>(fixture, '#search').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="tel" elements', () => {
    getEl<HTMLInputElement>(fixture, '#tel').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="url" elements', () => {
    getEl<HTMLInputElement>(fixture, '#url').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="password" elements', () => {
    getEl<HTMLInputElement>(fixture, '#password').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input <textarea> elements', () => {
    getEl<HTMLTextAreaElement>(fixture, 'textarea').focus();
    expect(textBoxIsActive()).toBe(true);
  });

  it('should return true for input type="checkbox" elements', () => {
    getEl<HTMLInputElement>(fixture, '#checkbox').focus();
    expect(textBoxIsActive()).toBe(false);
  });

  it('should return false for input type="radio" elements', () => {
    getEl<HTMLInputElement>(fixture, '#radio').focus();
    expect(textBoxIsActive()).toBe(false);
  });

  it('should return false for input type="submit" elements', () => {
    getEl<HTMLInputElement>(fixture, '#submit').focus();
    expect(textBoxIsActive()).toBe(false);
  });

  it('should return false for non-input elements', () => {
    getEl<HTMLInputElement>(fixture, 'button').focus();
    expect(textBoxIsActive()).toBe(false);
  });
});
