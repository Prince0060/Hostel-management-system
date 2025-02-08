import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';

@Component({
  selector: 'app-admin-room-allocation',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component],
  templateUrl: './admin-room-allocation.component.html',
  styleUrl: './admin-room-allocation.component.scss'
})
export class AdminRoomAllocationComponent {
  dataInfo: any[] = [];

  constructor(private _myapi: AdminService, public _commonFn: CommonfunctionsService) {
  }
  ngOnInit(): void {
    this.getNoticeInfo();
  }

  getNoticeInfo() {
    this._myapi.getAllStudents().subscribe({
      next: (data) => {
        this.dataInfo = data.students.filter((x: any) => (x.year === 4 && x.roomSuggestion.length > 0));
        console.log(this.dataInfo);
      },
      error: (error) => {

      }
    })
  }

  allotRoomsAuto() {
    this._myapi.allotRoomsAuto().subscribe({
      next: (data) => {
        this._commonFn.callAlert("Room Allotment Done", 'ok');
      },
      error: (error) => {
        this._commonFn.callAlert("Error: " + error.error.message, 'ok');
      }
    })
  }

}
