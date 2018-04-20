import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  /**
   * Items to render in the what's new widget
   */
  public whatsNewItems: string[] = [
    'Login screen.',
    'Forget password screen.'
  ];

  public constructor() {}

  public ngOnInit(): void {}
}
