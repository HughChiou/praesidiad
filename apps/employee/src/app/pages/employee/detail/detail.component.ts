import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee, EmployeeService } from '../../../services/employee.service';
import { DialogData } from '../edit/edit.component';

@Component({
  selector: 'praesidiad-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  employeeId?: number;
  employeeDetail$?: Observable<Employee>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<DetailComponent>,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.employeeId = (this.data as Employee).id;

    this.employeeDetail$ = this.employeeService
      .getEmployee(this.employeeId as number)
      .pipe(
        catchError(() => {
          this.dialogRef.close();

          return EMPTY;
        }),
      );
  }
}
