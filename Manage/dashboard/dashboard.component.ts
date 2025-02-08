import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashInfo!: any;
  constructor(private aroute: ActivatedRoute, private _router: Router, private _adminapi: AdminService) {
    this.aroute.queryParams.subscribe((params) => {
      var token: string = params!['token'];
      if (token && token.length) {
        localStorage.setItem("admintoken", token);
        this._router.navigate(['/manage', 'dashboard']);
      }
    });
  }
  ngOnInit(): void {
    this._adminapi.getDashbaoardInfo().subscribe({
      next: (data) => {
        console.log(data);
        this.dashInfo = data;
      },
      error: (error) => {
      }
    });

  }
}
