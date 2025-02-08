import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomallotComponent } from './roomallot.component';

describe('RoomallotComponent', () => {
  let component: RoomallotComponent;
  let fixture: ComponentFixture<RoomallotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomallotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
