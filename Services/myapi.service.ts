import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseserviceService } from './baseservice.service';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {

  constructor(private baseService: BaseserviceService) {

  }

  // get Login
  login(data: any): Observable<any> {
    return this.baseService.Postlist('student/login', data).pipe(map((results) => results));
  }

  // get Login
  getStudentInfo(): Observable<any> {
    return this.baseService.Getlist('student').pipe(map((results) => results));
  }

  sendmail(): Observable<any> {
    return this.baseService.Getlist('student/sendmail').pipe(map((results) => results));
  }
  verifyStudent(id: any): Observable<any> {
    return this.baseService.Getlist('student/verifyStudent/' + id).pipe(map((results) => results));
  }

  addStudent(data: any): Observable<any> {
    return this.baseService.Postlist('student', data).pipe(map((results) => results));
  }

  roomSuggestion(data: any): Observable<any> {
    return this.baseService.Postlist('student/roomSuggestion', data).pipe(map((results) => results));
  }

  ///announcement/getAllAnnouncenment
  getAllAnnouncenment(): Observable<any> {
    return this.baseService.Getlist('announcement/getAllAnnouncenment').pipe(map((results) => results));
  }
  getSpecificAnnouncenment(): Observable<any> {
    return this.baseService.Getlist('announcement/getSpecificAnnouncenment').pipe(map((results) => results));
  }
  getRooms(): Observable<any> {
    return this.baseService.Getlist('room').pipe(map((results) => results));
  }

  assignRooms(data: any): Observable<any> {
    return this.baseService.Postlist('room/assign', data).pipe(map((results) => results));
  }

  // GET STUDENT ROOM
  getRoomByStudentId(): Observable<any> {
    return this.baseService.Getlist('room/getRoomByStudentId').pipe(map((results) => results));
  }

  // GET STUDENT COMPLAINTS
  getStudentComplaints(): Observable<any> {
    return this.baseService.Getlist('complaint/getStudentComplaints').pipe(map((results) => results));
  }

  addComplaint(data: any): Observable<any> {
    return this.baseService.Postlist('complaint', data).pipe(map((results) => results));
  }

}
