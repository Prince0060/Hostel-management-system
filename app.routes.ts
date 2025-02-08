import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./Pages/pages.module').then((x) => x.PageModule),
    },
    {
      path: 'manage',
      loadChildren: () => import('./Manage/manage.module').then((x) => x.ManageModule),
    },
  ];