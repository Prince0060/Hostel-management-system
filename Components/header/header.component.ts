import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogModel, ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private _router: Router, public dialog: MatDialog) {
    var token = localStorage.getItem("token")!;
    if (token === null)
      _router.navigate(['/login']);
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
        localStorage.removeItem('token');
        this._router.navigate(['/frontview']);
      }
    });

    
  }
}
