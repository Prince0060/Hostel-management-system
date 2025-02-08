import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { jsPDF } from "jspdf";
import autoTable, { applyPlugin } from 'jspdf-autotable';
import { AdminheaderComponent } from '../../Components/adminheader/adminheader.component';
import { AdminleftmenuComponent } from '../../Components/adminleftmenu/adminleftmenu.component';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { Table91Component } from '../../Components/table91/table91.component';
import { AdminService } from '../../Services/admin.service';
import { CommonfunctionsService } from '../../Services/commonfunctions.service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [AdminheaderComponent, AdminleftmenuComponent, AnnouncementsComponent, MatIconModule, MatCardModule, MatButtonModule, CommonModule, RouterModule, Table91Component],
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.scss'
})
export class AdminStudentsComponent {
  displayedColumns!: string[];
  dataSource: any;
  studentsInfo: any[] = [];
  constructor(private _myapi: AdminService, public _commonFn: CommonfunctionsService) {
  }
  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo() {
    this._myapi.getAllStudents().subscribe({
      next: (data) => {
        this.studentsInfo = data.students;
        this.displayedColumns = ['rollNumber', 'name', 'branch', 'year', 'contactNumber', 'email'];
        this.dataSource = new MatTableDataSource(data.students);
      },
      error: (error) => {

      }
    })
  }

  exportData() {
    applyPlugin(jsPDF);
    const doc = new jsPDF('l', 'mm', 'a4');
    var data1: any[] = [];

    this.studentsInfo.forEach((data) => {
      data1.push([data.rollNumber, data.name, data.branch, data.year, data.contactNumber, data.email]);
    })

    autoTable(doc, {
      head: [['rollNumber', 'name', 'branch', 'year', 'contactNumber', 'email']],
      body: data1,
      didDrawCell: (data) => { },
    });
    doc.save("students.pdf");
    this._commonFn.callAlert("Data is successfully exported", 'ok');
  }



}
