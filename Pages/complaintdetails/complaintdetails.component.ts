import { Component } from '@angular/core';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { HeaderComponent } from '../../Components/header/header.component';

@Component({
  selector: 'app-complaintdetails',
  standalone: true,
  imports: [HeaderComponent,AsideProfileComponent,AnnouncementsComponent],
  templateUrl: './complaintdetails.component.html',
  styleUrl: './complaintdetails.component.scss'
})
export class ComplaintdetailsComponent {

}
