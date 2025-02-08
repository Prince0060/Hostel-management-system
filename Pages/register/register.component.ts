import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private _myapi: MyapiService, private _fb: FormBuilder, public _commonFn: CommonfunctionsService, private _router: Router) {
    this.createRegisterForm();
    var token = localStorage.getItem("token")!;
    if (token != null)
      _router.navigate(['/home']);
  }

  createRegisterForm() {
    this.registerForm = this._fb.group({
      rollNumber: [''],
      branch: [''],
      year: [''],
      name: [''],
      fatherName: [''],
      motherName: [''],
      contactNumber: ['', Validators.pattern('[- +()0-9]+')],
      parentsContactNumber: [''],
      email: ['', Validators.email],
      address: [''],
      password: ['', Validators.required, Validators.minLength(6)],
      cgpercent: [0]
    });
  }

  onSubmit() {

    var values = {
      rollNumber: this.registerForm.get('rollNumber')?.value,
      branch: this.registerForm.get('branch')?.value,
      year: this.registerForm.get('year')?.value,
      name: this.registerForm.get('name')?.value,
      fatherName: this.registerForm.get('fatherName')?.value,
      motherName: this.registerForm.get('motherName')?.value,
      contactNumber: this.registerForm.get('contactNumber')?.value,
      parentsContactNumber: this.registerForm.get('parentsContactNumber')?.value,
      email: this.registerForm.get('email')?.value,
      address: this.registerForm.get('address')?.value,
      password: this.registerForm.get('password')?.value,
      cgpercent: this.registerForm.get('cgpercent')?.value,
      status: true
    };
    if (values.rollNumber && values.name && values.email && values.password && values.contactNumber) {
      if (values.contactNumber.length < 10 && values.parentsContactNumber.length < 10) {
        this._commonFn.callAlert("Contact number is not in correct format.", 'ok');
        return;
      }
      
      
      this._myapi.addStudent(values).subscribe({
        next: (data) => {
          debugger;
          this._router.navigate(['/login']);
          this._commonFn.callAlert("Register Successful", 'ok');
        },
        error: (error) => {
          this._commonFn.callAlert(error.error.message, 'ok');
        }
      });
    } else {
      this._commonFn.callAlert("Fill the required feild", 'ok');
    }
  }
}
