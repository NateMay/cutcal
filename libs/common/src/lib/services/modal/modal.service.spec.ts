import { ModalSvc } from './modal.service';

describe('Modal Service', () => {

  let service: ModalSvc;


  beforeEach(() => {
    service = new ModalSvc();
  })



  it('modal() returns an observable', () => {
    const ob$ = service.modal;
    expect(typeof ob$).toBe('object');
    expect(ob$.source).toBeDefined();
  })



  it('sets teh overlayRef', () => {
    const ref: any = { ref: 0 };
    service._currentOverlayRef = null;
    service.overlayRef = ref;
    expect(service.overlayRef).toBe(ref);
    expect(service._currentOverlayRef).toBe(ref);
  })



  it('open() calls next on the Subject()', () =>  {
    const spy = spyOn(service._modal, 'next');
    const arg = {};
    service.open(arg);
    expect(spy).toHaveBeenCalledWith(arg);
  })



  it('dispose() calls dispose() on the OverlayRef', () => {
    service._currentOverlayRef = <any>{dispose: () => {}}
    const spy = spyOn(service._currentOverlayRef, 'dispose');
    service.dispose();
    expect(spy).toHaveBeenCalled();
  })
})
