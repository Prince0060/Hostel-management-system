import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss'],
})
export class ConfirmdialogComponent implements OnInit {
  title: string;
  message: string;
  btnType: number;
  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = data.title;
    this.message = data.message;
    this.btnType = data.btn;
  }

  ngOnInit(): void { }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string, public btn: number = 2) { }
}
