import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
@Component({
  selector: 'app-admin-complaint',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component],
  templateUrl: './admin-complaint.component.html',
  styleUrl: './admin-complaint.component.scss'
})
export class AdminComplaintComponent {
  displayedColumns!: string[];
  dataSource: any;
  noticeInfo: any[] = [];

  constructor(private _myapi: AdminService) {
  }
  ngOnInit(): void {
    this.getNoticeInfo();
  }

  getNoticeInfo() {
    this._myapi.getComplaints().subscribe({
      next: (data) => {
        this.noticeInfo = data.map((obj: any) => {
          if (obj.action === 1) {
            return { ...obj, "action": 'Open' }
          }
          return { ...obj, "action": 'Closed' }
        });
        this.displayedColumns = ['complaintType', 'description', 'action', 'createdAt', 'actions'];
        this.dataSource = new MatTableDataSource(this.noticeInfo);
      },
      error: (error) => {

      }
    })
  }

}
