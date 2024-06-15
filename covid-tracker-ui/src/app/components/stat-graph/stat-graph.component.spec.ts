import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatGraphComponent } from './stat-graph.component';

describe('StatGraphComponent', () => {
  let component: StatGraphComponent;
  let fixture: ComponentFixture<StatGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
