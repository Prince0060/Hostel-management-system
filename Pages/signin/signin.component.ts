import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
import { MyapiService } from '../../Services/myapi.service';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  signInForm!: FormGroup;
  constructor(private _myapi: MyapiService, private _fb: FormBuilder, public _commonFn: CommonfunctionsService, private _router: Router) {
    this.createSignInForm();
    var token = localStorage.getItem("token")!;
    if (token != null)
      _router.navigate(['/home']);
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
      this._myapi.login(values).subscribe({
        next: (data) => {
          this._router.navigate(['/home'], { queryParams: { token: data.token } });
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
