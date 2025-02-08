import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LasttimeagoPipe } from '../../Pipe/lasttimeago.pipe';
import { MyapiService } from '../../Services/myapi.service';

@Component({
  selector: 'app-announcementsIn',
  standalone: true,
  imports: [CommonModule,LasttimeagoPipe],
  templateUrl: './announcementsin.component.html',
  styleUrl: './announcementsin.component.scss'
})
export class AnnouncementsInComponent {
  announcementObj: any[] = [];
  constructor(private _myapi: MyapiService) {
  }
  ngOnInit(): void {
    this._myapi.getSpecificAnnouncenment().subscribe({
      next: (data) => {
        this.announcementObj = data.announcenments;
      },
      error: (error) => {

      }
    })
  }
}
