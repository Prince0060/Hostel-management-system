import { RouterModule, Routes } from '@angular/router';
import { AdminAddAnnouncementComponent } from './admin-add-announcement/admin-add-announcement.component';
import { AdminAddRoomsComponent } from './admin-add-rooms/admin-add-rooms.component';
import { AdminAnnouncementsComponent } from './admin-announcements/admin-announcements.component';
import { AdminComplaintComponent } from './admin-complaint/admin-complaint.component';
import { AdminComplaintinfoComponent } from './admin-complaintinfo/admin-complaintinfo.component';
import { AdminRoomAllocationComponent } from './admin-room-allocation/admin-room-allocation.component';
import { AdminRoomsComponent } from './admin-rooms/admin-rooms.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminsigninComponent } from './adminsignin/adminsignin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const MANAGE_ROUTER: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: AdminsigninComponent,
  },
  {
    path: 'students',
    component: AdminStudentsComponent,
  },
  {
    path: 'notices',
    component: AdminAnnouncementsComponent,
  },
  {
    path: 'complaints',
    component: AdminComplaintComponent,
  },
  {
    path: 'complaintinfo/:id',
    component: AdminComplaintinfoComponent,
  },
  {
    path: 'rooms',
    component: AdminRoomsComponent,
  },
  {
    path: 'roomallot',
    component: AdminRoomAllocationComponent,
  },
  {
    path: 'addroom/:id',
    component: AdminAddRoomsComponent,
  },
  {
    path: 'addnotices',
    component: AdminAddAnnouncementComponent,
  },
];

export const ManageRouter = RouterModule.forChild(MANAGE_ROUTER);
