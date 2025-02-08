import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LasttimeagoPipe } from '../../Pipe/lasttimeago.pipe';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule,LasttimeagoPipe],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
  announcementObj: any[] = [];
  constructor(private _myapi: MyapiService) {
  }
  ngOnInit(): void {
    this._myapi.getAllAnnouncenment().subscribe({
      next: (data) => {
        this.announcementObj = data.announcenments;
      },
      error: (error) => {

      }
    })
  }
}
