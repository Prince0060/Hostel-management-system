import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
@Component({
  selector: 'app-admin-complaintinfo',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component],
  templateUrl: './admin-complaintinfo.component.html',
  styleUrl: './admin-complaintinfo.component.scss'
})
export class AdminComplaintinfoComponent {
  dataInfo: any;
  complaintId: string = "";
  constructor(private _adminapi: AdminService, private aroute: ActivatedRoute, public _commonFn: CommonfunctionsService) {
    this.aroute.paramMap.subscribe((params) => {
      this.complaintId = params.get("id")!;
      this.getNoticeInfo();
    });
  }
  ngOnInit(): void {

  }

  getNoticeInfo() {
    this._adminapi.getComplaintById(this.complaintId).subscribe({
      next: (data) => {
        this.dataInfo = data;
      },
      error: (error) => {
      }
    })
  }

  close(id: any) {
    this._adminapi.closeComplaintById(this.complaintId).subscribe({
      next: (data) => {
        this.dataInfo = data;
        this._commonFn.callAlert("Complaint close successfully", 'ok');
      }
    })
  }

}
