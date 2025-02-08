import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComplaintinfoComponent } from './admin-complaintinfo.component';

describe('AdminComplaintinfoComponent', () => {
  let component: AdminComplaintinfoComponent;
  let fixture: ComponentFixture<AdminComplaintinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComplaintinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminComplaintinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
