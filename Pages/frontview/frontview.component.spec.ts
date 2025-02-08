import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontviewComponent } from './frontview.component';

describe('FrontviewComponent', () => {
  let component: FrontviewComponent;
  let fixture: ComponentFixture<FrontviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
