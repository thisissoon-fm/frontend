import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizerComponent } from './equalizer.component';

describe('EqualizerComponent', () => {
  let component: EqualizerComponent;
  let fixture: ComponentFixture<EqualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EqualizerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render correct number of equaliser elements', async(() => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const width = compiled.offsetWidth;
    const list = compiled.querySelectorAll('li');
    expect(list.length).toEqual(width);
  }));
});
