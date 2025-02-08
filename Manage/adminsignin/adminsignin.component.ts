import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';

@Component({
  selector: 'app-adminsignin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './adminsignin.component.html',
  styleUrl: './adminsignin.component.scss'
})
export class AdminsigninComponent {
  signInForm!: FormGroup;
  constructor(private _adminapi: AdminService, private _fb: FormBuilder, public _commonFn: CommonfunctionsService, private _router: Router) {
    this.createSignInForm();
  }

  createSignInForm() {
    this.signInForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      var values = {
        email: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value,
      };
      this._adminapi.login(values).subscribe({
        next: (data) => {
          this._router.navigate(['manage','dashboard'], { queryParams: { token: data.token } });
          this._commonFn.callAlert("Login Successful", 'ok');
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
