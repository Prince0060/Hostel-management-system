import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
@Component({
  selector: 'app-admin-add-announcement',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-add-announcement.component.html',
  styleUrl: './admin-add-announcement.component.scss'
})
export class AdminAddAnnouncementComponent {
  addForm!: FormGroup;
  constructor(private _adminapi: AdminService, private _fb: FormBuilder, public _commonFn: CommonfunctionsService, private _router: Router) {
    this.createaddForm();
  }

  createaddForm() {
    this.addForm = this._fb.group({
      heading: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      var values = {
        heading: this.addForm.get('heading')?.value,
        description: this.addForm.get('description')?.value,
        status: true,
      };
      this._adminapi.addAnnouncement(values).subscribe({
        next: (data) => {
          this._router.navigate(['/manage', 'notices']);
          this._commonFn.callAlert("Add Successful", 'ok');
        },
        error: (error) => {
          this._commonFn.callAlert(error.error.message, 'ok');
        }
      });
    } else {
      this._commonFn.callAlert("Fill Form Correctly", 'ok');
    }
  }
}
