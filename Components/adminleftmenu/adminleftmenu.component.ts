import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
import { ConfirmDialogModel, ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-adminleftmenu',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './adminleftmenu.component.html',
  styleUrl: './adminleftmenu.component.scss'
})
export class AdminleftmenuComponent {
  userInfo: any;
  constructor(private _myapi: AdminService, private _router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo() {
    this._myapi.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (error) => {

      }
    })
  }

  Logout(): void {
    const message = `Are you sure you want to logout?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        localStorage.removeItem('admintoken');
        this._router.navigate(['/frontview']);
      }
    });
  }

}
