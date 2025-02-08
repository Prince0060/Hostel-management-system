import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-aside-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside-profile.component.html',
  styleUrl: './aside-profile.component.scss'
})
export class AsideProfileComponent {
  public studentInfo: any = {};
  roomInfo: any;
  constructor(private _myapi: MyapiService, private _router: Router) {
  }
  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo() {
    this._myapi.getStudentInfo().subscribe({
      next: (data) => {
        this.studentInfo = data;
        if (!this.studentInfo?.isverified) {
          this._router.navigate(['/verify', '0']);
        } else {
          this.getStudentRoom();
        }

      },
    })
  }

  getStudentRoom() {
    this._myapi.getRoomByStudentId().subscribe({
      next: (data) => {
        this.roomInfo = data;
      },
      error: (error) => {
        if (error.error.message === "Room not found")
          if (this.studentInfo.year != 4)
            this._router.navigate(['/roomallot']);
          else if (this.studentInfo.year === 4 && (this.studentInfo.roomSuggestion == undefined || this.studentInfo.roomSuggestion?.length === 0)) {
            this._router.navigate(["/roomallot4"]);
          } else {
            this._router.navigate(['/home']);
          }
      }
    })
  }


}
