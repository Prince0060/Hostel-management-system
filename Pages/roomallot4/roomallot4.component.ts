import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArrayfilterPipe } from '../../Pipe/arrayfilter.pipe';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
import { MyapiService } from '../../Services/myapi.service';
@Component({
  selector: 'app-roomallot4',
  standalone: true,
  imports: [CommonModule, ArrayfilterPipe, MatCardModule, MatButtonModule],
  templateUrl: './roomallot4.component.html',
  styleUrl: './roomallot4.component.scss'
})
export class Roomallot4Component {
  roomInfo: any[] = [];
  dataInfo: any[5] = [];
  studentInfo: any;
  constructor(private _router: Router, public dialog: MatDialog, private _myapi: MyapiService, public _commonFn: CommonfunctionsService) {
    var token = localStorage.getItem("token")!;
    if (token === null)
      _router.navigate(['/login']);

  }

  ngOnInit(): void {
    this.getStudentInfo();
    this.getRooms();

  }


  getStudentInfo() {
    this._myapi.getStudentInfo().subscribe({
      next: (data) => {
        this.studentInfo = data;
      },
    })
  }

  getRooms() {
    this._myapi.getRooms().subscribe({
      next: (data) => {
        this.roomInfo = data.filter((x: any) => x.roomType === 'Single');

        // IF ALREADY SUGGESTED
        if (!(this.studentInfo.year === 4 && (this.studentInfo.roomSuggestion == undefined || this.studentInfo.roomSuggestion?.length === 0))) {
          this._router.navigate(['/home']);
        }
        //END
      },
    })
  }


  roomSelect(roomObj: any) {
    if (this.dataInfo.includes(roomObj)) {
      var index = this.dataInfo.indexOf(roomObj);
      this.dataInfo.splice(index, 1);
    } else {
      if (this.dataInfo.length < 5)
        this.dataInfo.push(roomObj);
      else
        this._commonFn.callAlert("5 Suggestions only", 'ok');
    }
  }

  roomSuggestion() {
    if (this.dataInfo.length > 2) {
      var values = {
        rooms: this.dataInfo
      }
      this._myapi.roomSuggestion(values).subscribe({
        next: (data) => {
          this._router.navigate(['/home']);
          this._commonFn.callAlert("Room Suggestion Save Successfully", 'ok');
        },
        error: (error) => {
          this._commonFn.callAlert(error.error.message, 'ok');
        }
      })
    }
    else
      this._commonFn.callAlert("select rooms first", 'ok');
  }
}
