import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcomplaintComponent } from './newcomplaint.component';

describe('NewcomplaintComponent', () => {
  let component: NewcomplaintComponent;
  let fixture: ComponentFixture<NewcomplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcomplaintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
