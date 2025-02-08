import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roomallot4Component } from './roomallot4.component';

describe('Roomallot4Component', () => {
  let component: Roomallot4Component;
  let fixture: ComponentFixture<Roomallot4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roomallot4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Roomallot4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
