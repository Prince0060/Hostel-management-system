import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ResponsiveService } from './Services/responive.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarModule, LoadingBarHttpClientModule, LoadingBarRouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private responsiveService: ResponsiveService) { }
  title = 'Frontend';
  ngOnInit() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      if (isMobile) {
        console.log('Mobile device detected');
      } else {
        console.log('Desktop detected');
      }
    });
    this.onResize();
  }

  onResize() {
    this.responsiveService.checkWidth();
  }
}
