import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Employee, EmployeeService } from '../../services/employee.service';
import { AlertService } from './../../services/alert.service';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'praesidiad-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  private _employeeList$ = new Subject<Employee[]>();
  employeeList$ = this._employeeList$.asObservable();
  displayedColumns: string[] = ['id', 'name', 'salary', 'age', 'actions'];
  isLoaded = false;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  private loadEmployeeList() {
    this.isLoaded = false;
    this.employeeService
      .listEmployees()
      .pipe(finalize(() => (this.isLoaded = true)))
      .subscribe((result) => {
        console.log('success');
        this._employeeList$.next(result);
      });
  }

  openDetail(employee: Employee) {
    this.dialog.open(DetailComponent, { data: employee });
  }

  openEdit(employee = {}) {
    const dialogRef = this.dialog.open(EditComponent, { data: employee });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const { id, ...rest } = result;

      if (id) {
        this.updateEmployee(id, result);
      } else {
        this.createEmployee(rest);
      }
    });
  }

  private updateEmployee(id: number, result: Employee) {
    this.employeeService.updateEmployee(id, result).subscribe((resp) => {
      const { status, message } = resp;

      if (status === 'success') {
        this.alert.openAlert({ title: 'Result', content: message });
      }
    });
  }

  private createEmployee(newEmployee: Employee) {
    this.employeeService.createEmployee(newEmployee).subscribe((resp) => {
      const { status, message } = resp;

      if (status === 'success') {
        this.alert.openAlert({ title: 'Result', content: message });
      }
    });
  }

  confirmRemove(employee: Employee) {
    this.alert
      .openAlert({
        title: 'title',
        content: `Are you sure you want to delete data of #${employee.id}-${employee.name}`,
        okText: 'Delete',
        okBtnColor: 'warn',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.removeEmployee(employee.id as number);
        }
      });
  }

  private removeEmployee(employeeId: number) {
    this.employeeService.removeEmployee(employeeId).subscribe((resp) => {
      const { status, message } = resp;

      if (status === 'success') {
        this.alert.openAlert({ title: 'Result', content: message });
      }
    });
  }

  reloadList() {
    this.loadEmployeeList();
  }
}
