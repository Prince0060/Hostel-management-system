import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomAllocationComponent } from './admin-room-allocation.component';

describe('AdminRoomAllocationComponent', () => {
  let component: AdminRoomAllocationComponent;
  let fixture: ComponentFixture<AdminRoomAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoomAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRoomAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
