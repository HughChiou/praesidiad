import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';

export const EMPLOYEE_ROUTE: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
];
