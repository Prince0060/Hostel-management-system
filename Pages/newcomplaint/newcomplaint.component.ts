import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-newcomplaint',
  standalone: true,
  imports: [HeaderComponent, AsideProfileComponent, AnnouncementsComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './newcomplaint.component.html',
  styleUrl: './newcomplaint.component.scss'
})
export class NewcomplaintComponent {
  addForm!: FormGroup;
  constructor(private _adminapi: MyapiService, private _fb: FormBuilder, public _commonFn: CommonfunctionsService, private _router: Router) {
    this.createaddForm();
  }

  createaddForm() {
    this.addForm = this._fb.group({
      complaintType: ['Electrical Work', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      var values = {
        complaintType: this.addForm.get('complaintType')?.value,
        description: this.addForm.get('description')?.value,
        action: 1,
      };
      this._adminapi.addComplaint(values).subscribe({
        next: (data) => {
          this._router.navigate(['/recentcomplaint']);
          this._commonFn.callAlert("your complaint is successfuly booked", 'ok');
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
