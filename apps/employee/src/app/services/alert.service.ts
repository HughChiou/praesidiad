import { AlertComponent } from './../components/alert/alert.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  openAlert({
    title,
    content,
    okText = 'OK',
    okBtnColor = 'primary',
  }: AlertSettings) {
    const dialogRef = this.dialog.open(AlertComponent);
    const { componentInstance } = dialogRef;

    componentInstance.settings = { title, content, okText, okBtnColor };

    return dialogRef;
  }
}

export interface AlertSettings {
  title?: string;
  content: string;
  okText?: string;
  okBtnColor?: 'primary' | 'accent' | 'warn';
}
