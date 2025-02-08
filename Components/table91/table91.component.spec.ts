import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table91Component } from './table91.component';

describe('Table91Component', () => {
  let component: Table91Component;
  let fixture: ComponentFixture<Table91Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Table91Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Table91Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
