import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleftmenuComponent } from './adminleftmenu.component';

describe('AdminleftmenuComponent', () => {
  let component: AdminleftmenuComponent;
  let fixture: ComponentFixture<AdminleftmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminleftmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminleftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
