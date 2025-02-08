import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AnnouncementsComponent } from '../../Components/announcements/announcements.component';
// import {images} from './images';
@Component({
  selector: 'app-frontview',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule, AnnouncementsComponent
  ],
  templateUrl: './frontview.component.html',
  styleUrl: './frontview.component.scss'
})
export class FrontviewComponent {

}
