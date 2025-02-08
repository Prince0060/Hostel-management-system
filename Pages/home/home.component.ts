import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { LasttimeagoPipe } from '../../Pipe/lasttimeago.pipe';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, AsideProfileComponent, MatIconModule, AnnouncementsComponent, RouterModule, CommonModule, LasttimeagoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('profile') profile!: AsideProfileComponent;
  complaintsInfo: any[] = [];
  constructor(private aroute: ActivatedRoute, private _router: Router, private _myapi: MyapiService) {
    this.aroute.queryParams.subscribe((params) => {
      var token: string = params!['token'];
      if (token && token.length) {
        localStorage.setItem("token", token);
        this._router.navigate(['/home']);
      }
    });
  }
  ngOnInit(): void {
    this.getOpenComplaintsInfo();

  }

  getOpenComplaintsInfo() {
    this._myapi.getStudentComplaints().subscribe({
      next: (data) => {
        this.complaintsInfo = data.filter((obj: any) => obj.action === 1);
        console.log(this.complaintsInfo);
      },
      error: (error) => {

      }
    })
  }

  setIcon(option: String) {
    if (option === "Electrical Work")
      return "architecture";
    else if (option === "Plumbing Work")
      return "router";
    else if (option === "Civil Work")
      return "computer";
    else if (option === "Theft Complaint")
      return "dns";
    return "devices_other";
  }

}
