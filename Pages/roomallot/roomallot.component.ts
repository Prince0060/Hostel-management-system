import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { ArrayfilterPipe } from '../../Pipe/arrayfilter.pipe';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';
import { MyapiService } from '../../Services/myapi.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-roomallot',
  standalone: true,
  imports: [AsideProfileComponent, CommonModule, ArrayfilterPipe, MatCardModule, MatButtonModule,MatMenuModule,MatExpansionModule,MatTabsModule],
  templateUrl: './roomallot.component.html',
  styleUrl: './roomallot.component.scss'
})
export class RoomallotComponent {
  panelOpenState = false;
  roomInfo: any[] = [];
  floorsInfo: any[] = [];
  dataInfo: any;
  constructor(private _router: Router, public dialog: MatDialog, private _myapi: MyapiService, public _commonFn: CommonfunctionsService) {
    var token = localStorage.getItem("token")!;
    if (token === null)
      _router.navigate(['/login']);
    this.getRooms();
  }

  // getStudentRoom() {
  //   this._myapi.getRoomByStudentId().subscribe({
  //     next: (data) => {
  //       this._router.navigate(['/']);
  //     },
  //   })
  // }

  getRooms() {
    this._myapi.getRooms().subscribe({
      next: (data) => {
        this.roomInfo = data.filter((x: any) => x.roomType === 'Sharing');
        this.floorsInfo = [...new Set(this.roomInfo.map(item => item.floorNo))];
      },
    })
  }

  getFloorArray(index: any) {
    return this.roomInfo.filter(x => x.floorNo === index);
  }

  roomSelect(roomObj: any) {
    this.dataInfo = roomObj;
  }

  assignRoom(studentInfo: any) {
    var values = {
      roomId: this.dataInfo._id,
      studentId: studentInfo._id
    }
    this._myapi.assignRooms(values).subscribe({
      next: (data) => {
        this._router.navigate(['/home']);
        this._commonFn.callAlert("Room Assign Successfully", 'ok');
      },
      error: (error) => {
        this._commonFn.callAlert(error.error.message, 'ok');
      }
    })
  }



}
