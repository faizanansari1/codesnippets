import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefferDemoComponent } from './deffer-demo.component';

describe('DefferDemoComponent', () => {
  let component: DefferDemoComponent;
  let fixture: ComponentFixture<DefferDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefferDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefferDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
