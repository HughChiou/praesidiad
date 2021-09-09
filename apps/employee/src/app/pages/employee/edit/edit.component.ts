import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../services/employee.service';

export interface DialogData {
  name: string;
  salary: number;
  age: number;
}

@Component({
  selector: 'praesidiad-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  employeeId?: number;
  employeeForm: FormGroup = this.fb.group({});

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<EditComponent>,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.employeeId = (this.data as Employee).id;

    this.employeeForm = this.fb.group({
      name: [this.data?.name, Validators.required],
      salary: [this.data?.salary, Validators.required],
      age: [this.data?.age, Validators.required],
    });
  }

  submit() {
    const { value, invalid } = this.employeeForm;
    const { employeeId: id } = this;

    if (invalid) {
      return;
    }
    this.dialogRef.close({ ...value, id });
  }
}
