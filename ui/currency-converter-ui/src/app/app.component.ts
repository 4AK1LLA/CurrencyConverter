import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `<h1>Welcome to {{title}}! Diplom</h1>`,
  styles: [],
})
export class AppComponent {
  title = 'currency-converter-ui';
}
