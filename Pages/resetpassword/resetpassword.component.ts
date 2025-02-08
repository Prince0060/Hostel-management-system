import { Component } from '@angular/core';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
import { AsideProfileComponent } from '../../Components/aside-profile/aside-profile.component';
import { HeaderComponent } from '../../Components/header/header.component';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [HeaderComponent, AsideProfileComponent,AnnouncementsComponent],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {

}
