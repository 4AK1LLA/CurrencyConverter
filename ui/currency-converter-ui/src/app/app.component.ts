import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{title}}! Diplom</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'currency-converter-ui';
}
