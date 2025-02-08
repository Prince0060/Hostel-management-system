import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { ConfirmDialogModel, ConfirmdialogComponent } from '../../Components/confirmdialog/confirmdialog.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';

@Component({
  selector: 'app-admin-add-rooms',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-add-rooms.component.html',
  styleUrl: './admin-add-rooms.component.scss'
})
export class AdminAddRoomsComponent {
  addForm!: FormGroup;
  dataInfo: any;
  roomId: any;
  constructor(private _adminapi: AdminService, private _fb: FormBuilder, public _commonFn: CommonfunctionsService, private _router: Router, private aroute: ActivatedRoute, public dialog: MatDialog) {
    this.createaddForm();
    this.aroute.paramMap.subscribe((params) => {
      this.roomId = params.get("id")!;
      if (this.roomId !== "0") {
        this.getNoticeInfo();
      }
    });

  }

  createaddForm() {
    this.addForm = this._fb.group({
      _id: ['0'],
      roomNo: ['', Validators.required],
      roomType: ['Sharing', Validators.required],
      floorNo: [1, Validators.required]
    });
  }

  getNoticeInfo() {
    this._adminapi.getRoomById(this.roomId).subscribe({
      next: (data) => {
        this.dataInfo = data;
        this.addForm.patchValue({
          "_id": data._id,
          "roomNo": data.roomNo,
          "roomType": data.roomType,
          "floorNo": data.floorNo
        });
      },
      error: (error) => {

      }
    })
  }

  onSubmit() {
    if (this.addForm.valid) {

      var values: any;
      if (this.roomId === "0") {
        values = {
          roomNo: this.addForm.get('roomNo')?.value,
          roomType: this.addForm.get('roomType')?.value,
          floorNo: this.addForm.get('floorNo')?.value,
        };
      } else {
        values = {
          _is: this.addForm.get('_id')?.value,
          roomNo: this.addForm.get('roomNo')?.value,
          roomType: this.addForm.get('roomType')?.value,
          floorNo: this.addForm.get('floorNo')?.value,
        };
      }

      this._adminapi.addRoom(values).subscribe({
        next: (data) => {
          this._router.navigate(['/manage', 'rooms']);
          this._commonFn.callAlert("Add/Update Successful", 'ok');
        },
        error: (error) => {
          this._commonFn.callAlert(error.error.message, 'ok');
        }
      });
    } else {
      this._commonFn.callAlert("Fill Form Correctly", 'ok');
    }
  }

  unassign(studentId: any) {
    const message = `Are you sure you want to remove student?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        var values = {
          roomId: this.roomId,
          studentId: studentId
        }
        this._adminapi.assignRoomToStudent(values).subscribe({
          next: (data) => {
            this.getNoticeInfo();
            this._commonFn.callAlert("Student removed successfully", 'ok');
          },
        })

      }
    });
  }
}
