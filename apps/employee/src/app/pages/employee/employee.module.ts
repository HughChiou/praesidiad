import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared.module';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { EmployeeComponent } from './employee.component';
import { EMPLOYEE_ROUTE } from './employee.routing';

@NgModule({
  declarations: [EmployeeComponent, DetailComponent, EditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(EMPLOYEE_ROUTE),
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
})
export class EmployeeModule {}
