import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.scss'
})
export class AdminheaderComponent {
  constructor(private _router: Router, public dialog: MatDialog) {
    var token = localStorage.getItem("admintoken")!;
    if (token === null)
      _router.navigate(['/manage', 'login']);
  }
}
