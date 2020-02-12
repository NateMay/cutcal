import { TestBed } from '@angular/core/testing';
import { ActionLinkObserver } from './action-link.service';

describe('ActionLinkObserver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionLinkObserver = new ActionLinkObserver();
    expect(service).toBeTruthy();
  });
});
