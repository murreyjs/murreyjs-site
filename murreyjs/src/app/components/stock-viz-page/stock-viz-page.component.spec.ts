import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockVizPageComponent } from './stock-viz-page.component';

describe('StockVizPageComponent', () => {
  let component: StockVizPageComponent;
  let fixture: ComponentFixture<StockVizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockVizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockVizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
