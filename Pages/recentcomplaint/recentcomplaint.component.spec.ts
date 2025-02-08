import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentcomplaintComponent } from './recentcomplaint.component';

describe('RecentcomplaintComponent', () => {
  let component: RecentcomplaintComponent;
  let fixture: ComponentFixture<RecentcomplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentcomplaintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
