import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadialProgressComponent } from './radial-progress.component';

@Component({
  template: `
    <ds-radial-progress
      [percent]="percent"
      [stepText]="stepText"
      [announceText]="announceText"
      [diameter]="diameter"
      [progressStrokeWidth]="progressStrokeWidth"
      [baseStrokeWidth]="baseStrokeWidth"
    >
      {{ content }}
    </ds-radial-progress>
  `
})
class TestRadialProgress {
  percent = 25;
  diameter = 50;
  progressStrokeWidth = 4;
  baseStrokeWidth = 2;
  stepText = 'next step';
  announceText = 'announce text';
  content = 'content';
}

describe('RadialProgressComponent', () => {
  const liveAnnouncerStub = {
    announce: (msg: string) => Promise.resolve()
  };

  let fixture: ComponentFixture<TestRadialProgress>;
  let parent: TestRadialProgress;
  let componentDebug: DebugElement;
  let component: RadialProgressComponent;
  let liveAnnouncer: LiveAnnouncer;
  let getDE: (css: string) => DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRadialProgress, RadialProgressComponent],
      providers: [{ provide: LiveAnnouncer, useValue: liveAnnouncerStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadialProgress);
    parent = fixture.componentInstance;
    componentDebug = fixture.debugElement.query(
      By.directive(RadialProgressComponent)
    );
    component = componentDebug.componentInstance;
    liveAnnouncer = TestBed.get(LiveAnnouncer);
    getDE = (css: string) => fixture.debugElement.query(By.css(css));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('property getters:', () => {
    const radiusShouldBe = 23;
    const circumferenceShouldBe = Math.PI * 2 * radiusShouldBe;
    const arcShouldBe = 25 * 0.01 * circumferenceShouldBe; // percent of circumference
    const checkWidthShouldBe = 50 * 0.1; // one tenth of diameter

    describe('radius', () => {
      it('should return radius based off the diameter passed in and the larger of the two stroke widths', () => {
        fixture.detectChanges();
        expect(component.radius).toBe(radiusShouldBe);
      });
    });

    describe('circumference', () => {
      it('should return circumference', () => {
        fixture.detectChanges();
        expect(component.circumference).toBe(circumferenceShouldBe);
      });
    });

    describe('arcLength', () => {
      it('should return the length of the arc based on the circumference and the percent passed in', () => {
        fixture.detectChanges();
        expect(component.arcLength).toBe(arcShouldBe);
      });
    });

    describe('checkPath', () => {
      it('should return svg path to be used for checkmark', () => {
        fixture.detectChanges();
        // Some browsers calculatons may not match exact decimal point, so we just want to check for structure
        expect(component.checkPath).toMatch(
          /^M[\d.]* [\d.]* L[\d.]* [\d.]* L[\d.]* [\d.]*$/
        );
      });
    });

    describe('checkWidth', () => {
      it('should return the stroke width to be used for the svg checkmark', () => {
        fixture.detectChanges();
        expect(component.checkWidth).toBe(checkWidthShouldBe);
      });
    });
  });

  describe('@Inputs', () => {
    describe('percent', () => {
      it('should get percent from parent', () => {
        parent.percent = 45;
        fixture.detectChanges();
        expect(component.percent).toBe(45);
      });

      it('should warn when percent is less than 0 and force percent to be 0', () => {
        parent.percent = -5;
        fixture.detectChanges();
        expect(component.percent).toBe(0);
      });

      it('should warn when percent is greater than 100 and force percent to be 100', () => {
        parent.percent = 300;
        fixture.detectChanges();
        expect(component.percent).toBe(100);
      });
    });

    describe('diameter', () => {
      it('should get diameter from parent', () => {
        parent.diameter = 200;
        fixture.detectChanges();
        expect(component.diameter).toBe(200);
      });
    });

    describe('progressStrokeWidth', () => {
      it('should get progressStrokeWidth from parent', () => {
        parent.progressStrokeWidth = 14;
        fixture.detectChanges();
        expect(component.progressStrokeWidth).toBe(14);
      });
    });

    describe('baseStrokeWidth', () => {
      it('should get baseStrokeWidth from parent', () => {
        parent.baseStrokeWidth = 12;
        fixture.detectChanges();
        expect(component.baseStrokeWidth).toBe(12);
      });
    });

    describe('stepText', () => {
      it('should get stepText from parent', () => {
        parent.stepText = 'new step';
        fixture.detectChanges();
        expect(component.stepText).toBe('new step');
      });
    });

    describe('announceText', () => {
      it('should get announceText from parent', () => {
        parent.announceText = 'new announce';
        fixture.detectChanges();
        expect(component.announceText).toBe('new announce');
      });

      it('should call announce method', () => {
        const announceSpy = jest.spyOn(component, 'announce');
        parent.announceText = 'new announce';
        fixture.detectChanges();
        expect(announceSpy).toHaveBeenCalledWith('new announce');
      });
    });
  });

  describe('methods', () => {
    describe('announce', () => {
      it('should call announce from LiveAnnouncer', () => {
        const liveAnnounceSpy = jest.spyOn(liveAnnouncer, 'announce');
        component.announce('my announce');
        expect(liveAnnounceSpy).toHaveBeenCalledWith('my announce');
      });
    });
  });

  describe('DOM', () => {
    it('should set svg viewBox, height and width from diameter', () => {
      fixture.detectChanges();
      const svgEl = getDE('svg').nativeElement;
      expect(svgEl.getAttribute('viewBox')).toBe('0 0 50 50');
      expect(svgEl.style.width).toBe('50px');
      expect(svgEl.style.height).toBe('50px');
    });

    it('should set radius and stroke-width of back circle', () => {
      fixture.detectChanges();
      const backCircle = getDE('.rpb-back').nativeElement;
      expect(backCircle.getAttribute('r')).toBe('23');
      expect(backCircle.style.strokeWidth).toBe('2px');
    });

    it('should remove arc circle when percent is 0', () => {
      fixture.detectChanges();
      expect(getDE('.rpb-arc')).toBeTruthy();

      parent.percent = 0;
      fixture.detectChanges();
      expect(getDE('.rpb-arc')).toBeFalsy();
    });

    it('should remove text element, add path for check, and add classes to both back and arc circle when percent is 100', () => {
      parent.percent = 99;
      fixture.detectChanges();
      const backCircle = getDE('.rpb-back').nativeElement;
      const arcCircle = getDE('.rpb-arc').nativeElement;
      expect(backCircle.classList).not.toContain('rpb-back-done');
      expect(arcCircle.classList).not.toContain('rpb-arc-done');
      expect(getDE('.rpb-text')).toBeTruthy();
      expect(getDE('.rpb-done-check')).toBeFalsy();

      parent.percent = 100;
      fixture.detectChanges();
      expect(backCircle.classList).toContain('rpb-back-done');
      expect(arcCircle.classList).toContain('rpb-arc-done');
      expect(getDE('.rpb-text')).toBeFalsy();
      expect(getDE('.rpb-done-check')).toBeTruthy();
    });

    it('should set radius, stroke-width, stroke-dasharray and stroke-dashoffset of arc', () => {
      fixture.detectChanges();
      const arcCircle = getDE('.rpb-arc').nativeElement;
      expect(arcCircle.getAttribute('r')).toBe('23');
      expect(arcCircle.style.strokeWidth).toBe('4px');
      // Some browsers calculatons may not match exact decimal point, so we just want to check basic number
      expect(arcCircle.style.strokeDasharray).toMatch(/36.[\d]* 144.[\d]*/);
      expect(arcCircle.style.strokeDashoffset).toMatch(/36.[\d]*/);
    });

    it('should set path and stroke-width on path of checkmark', () => {
      parent.percent = 100;
      fixture.detectChanges();
      const check = getDE('.rpb-done-check').nativeElement;
      expect(check.getAttribute('d')).toMatch(
        /^M[\d.]* [\d.]* L[\d.]* [\d.]* L[\d.]* [\d.]*$/
      );
      expect(check.style.strokeWidth).toBe('5px');
    });

    it('should insert content projected code in section below svg', () => {
      parent.content = 'my test content';
      fixture.detectChanges();
      const contentProj = getDE('.rpb-content').nativeElement;
      expect(contentProj.innerHTML).toContain('my test content');
    });
  });
});
