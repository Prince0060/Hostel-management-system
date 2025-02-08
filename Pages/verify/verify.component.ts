import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [MatCardModule, CommonModule, AsideProfileComponent, RouterModule, MatButtonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  studentId: any;
  constructor(private _myapi: MyapiService, public _commonFn: CommonfunctionsService, private aroute: ActivatedRoute,private _router: Router) {
    this.aroute.paramMap.subscribe((params) => {
      this.studentId = params.get("id")!;
      if (this.studentId === "0") {
        this.sendMail();
      } else {
        this.verifyMail();
      }
    });
  }

  sendMail() {
    this._myapi.sendmail().subscribe({
      next: (data) => {
        this._commonFn.callAlert("mail sent Successfully", 'ok');
      },
      error: (error) => {
        this._commonFn.callAlert(error.error.message, 'ok');
      }
    })
  }

  verifyMail() {
    this._myapi.verifyStudent(this.studentId).subscribe({
      next: (data) => {
        this._router.navigate(['/home']);
        this._commonFn.callAlert("Mail Verified", 'ok');
      },
      error: (error) => {
        this._commonFn.callAlert(error.error.message, 'ok');
      }
    })
  }

}
