import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVizPageComponent } from './audio-viz-page.component';

describe('AudioVizPageComponent', () => {
  let component: AudioVizPageComponent;
  let fixture: ComponentFixture<AudioVizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioVizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
