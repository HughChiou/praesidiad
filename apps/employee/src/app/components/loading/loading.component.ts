import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'praesidiad-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loadingText = '';

  constructor() {}

  ngOnInit(): void {
    const candidates = [
      'My other loading screen is much faster.',
      'Are we there yet?',
      'How about have a coffee?',
      'Please wait while the little elves work on this job',
      'Have a good day.',
      'Go ahead -- hold your breath!',
      "...at least you're not on hold...",
      "We're testing your patience",
    ];

    this.loadingText =
      candidates[Math.floor(Math.random() * candidates.length)];
  }
}
