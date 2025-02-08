import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-recentcomplaint',
  standalone: true,
  imports: [HeaderComponent, AsideProfileComponent, AnnouncementsComponent, MatButtonModule, MatIconModule, RouterModule, Table91Component, CommonModule],
  templateUrl: './recentcomplaint.component.html',
  styleUrl: './recentcomplaint.component.scss'
})
export class RecentcomplaintComponent {
  displayedColumns!: string[];
  dataSource: any;
  noticeInfo: any[] = [];
  constructor(private _myapi: MyapiService) {
  }
  ngOnInit(): void {
    this.getNoticeInfo();
  }

  getNoticeInfo() {
    this._myapi.getStudentComplaints().subscribe({
      next: (data) => {
        this.noticeInfo = data.map((obj: any) => {
          if (obj.action === 1) {
            return { ...obj, "action": 'Open' }
          }
          return { ...obj, "action": 'Closed' }
        });
        this.displayedColumns = ['complaintType', 'description', 'action', 'createdAt'];
        this.dataSource = new MatTableDataSource(this.noticeInfo);
      },
      error: (error) => {

      }
    })
  }
}
