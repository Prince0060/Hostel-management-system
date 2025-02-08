import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseadminService } from './baseadmin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private baseService: BaseadminService) { }

  // get Login
  login(data: any): Observable<any> {
    return this.baseService.Postlist('users/login', data).pipe(map((results) => results));
  }

  // get Info
  getUserInfo(): Observable<any> {
    return this.baseService.Getlist('users/info').pipe(map((results) => results));
  }

  // get Info
  getDashbaoardInfo(): Observable<any> {
    return this.baseService.Getlist('users/dashboardInfo').pipe(map((results) => results));
  }

  // get All Students
  getAllStudents(): Observable<any> {
    return this.baseService.Getlist('student/allStudents').pipe(map((results) => results));
  }

  ///announcement/getAllAnnouncenment
  getAllAnnouncenment(): Observable<any> {
    return this.baseService.Getlist('announcement/getAllAnnouncenment').pipe(map((results) => results));
  }

  // Add Announcement
  addAnnouncement(data: any): Observable<any> {
    return this.baseService.Postlist('announcement/addAnnouncenment', data).pipe(map((results) => results));
  }

  // Add Announcement-roomId
  addRoom(data: any): Observable<any> {
    return this.baseService.Postlist('room', data).pipe(map((results) => results));
  }
  getRooms(): Observable<any> {
    return this.baseService.Getlist('room').pipe(map((results) => results));
  }
  getRoomById(roomId: any): Observable<any> {
    return this.baseService.Getlist('room/' + roomId).pipe(map((results) => results));
  }

  assignRoomToStudent(data: any): Observable<any> {
    return this.baseService.Postlist('room/unassign', data).pipe(map((results) => results));
  }


  allotRoomsAuto(): Observable<any> {
    return this.baseService.Getlist('room/allotRoomsAuto').pipe(map((results) => results));
  }


  //COMPLAINTS
  getComplaints(): Observable<any> {
    return this.baseService.Getlist('complaint').pipe(map((results) => results));
  }

  getComplaintById(id: any): Observable<any> {
    return this.baseService.Getlist('complaint/getComplaintById/' + id).pipe(map((results) => results));
  }

  closeComplaintById(id: any): Observable<any> {
    return this.baseService.Getlist('complaint/closeComplaintById/' + id).pipe(map((results) => results));
  }


  deleteAnnouncement(id: any): Observable<any> {
    return this.baseService.Getlist('announcement/delete/' + id,).pipe(map((results) => results));
  }
}
