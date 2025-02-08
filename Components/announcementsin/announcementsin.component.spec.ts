import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsInComponent } from './announcementsin.component';

describe('AnnouncementsComponent', () => {
  let component: AnnouncementsInComponent;
  let fixture: ComponentFixture<AnnouncementsInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementsInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
