import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAnnouncementComponent } from './admin-add-announcement.component';

describe('AdminAddAnnouncementComponent', () => {
  let component: AdminAddAnnouncementComponent;
  let fixture: ComponentFixture<AdminAddAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddAnnouncementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
