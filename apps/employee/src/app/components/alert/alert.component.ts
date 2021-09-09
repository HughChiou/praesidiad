import { Component, Input, OnInit } from '@angular/core';
import { AlertSettings } from '../../services/alert.service';

@Component({
  selector: 'praesidiad-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() settings?: AlertSettings;

  constructor() {}

  ngOnInit(): void {}
}
