import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { ConfirmDialogModel, ConfirmdialogComponent } from '../../Components/confirmdialog/confirmdialog.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';

@Component({
  selector: 'app-admin-announcements',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component],
  templateUrl: './admin-announcements.component.html',
  styleUrl: './admin-announcements.component.scss'
})
export class AdminAnnouncementsComponent {
  displayedColumns!: string[];
  dataSource: any;
  noticeInfo: any[] = [];
  constructor(private _myapi: AdminService, public dialog: MatDialog, public _commonFn: CommonfunctionsService) {
  }
  ngOnInit(): void {
    this.getNoticeInfo();
  }

  getNoticeInfo() {
    this._myapi.getAllAnnouncenment().subscribe({
      next: (data) => {
        this.noticeInfo = data;
        this.displayedColumns = ['heading', 'description','rollno', 'createdAt', 'status', 'delete'];
        this.dataSource = new MatTableDataSource(data.announcenments);
      },
      error: (error) => {

      }
    })
  }

  deleteme(_id: string) {
    const message = `Are you sure you want to delete this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        console.log(_id);
        this._myapi.deleteAnnouncement(_id).subscribe({
          next: (data) => {
            this.getNoticeInfo();
            this._commonFn.callAlert(data.message, 'ok');
          },
        })

      }
    });
  }
}
