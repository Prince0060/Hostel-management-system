import { RouterModule, Routes } from '@angular/router';
import { ComplaintdetailsComponent } from './complaintdetails/complaintdetails.component';
import { HomeComponent } from './home/home.component';
import { NewcomplaintComponent } from './newcomplaint/newcomplaint.component';
import { RecentcomplaintComponent } from './recentcomplaint/recentcomplaint.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RoomallotComponent } from './roomallot/roomallot.component';
import { Roomallot4Component } from './roomallot4/roomallot4.component';
import { SigninComponent } from './signin/signin.component';
import { VerifyComponent } from './verify/verify.component';
import { FrontviewComponent } from './frontview/frontview.component';

const PAGE_ROUTER: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path:'frontview',
    component:FrontviewComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'changepassword',
    component: ResetpasswordComponent,
  },
  {
    path: 'recentcomplaint',
    component: RecentcomplaintComponent,
  },
  {
    path: 'newcomplaint',
    component: NewcomplaintComponent,
  },
  {
    path: 'roomallot',
    component: RoomallotComponent,
  },
  {
    path: 'roomallot4',
    component: Roomallot4Component,
  },
  {
    path: 'verify/:id',
    component: VerifyComponent,
  },
  {
    path: 'complaintdetails/:id',
    component: ComplaintdetailsComponent,
  },
];

export const PageRouter = RouterModule.forChild(PAGE_ROUTER);
