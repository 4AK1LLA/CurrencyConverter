import { Component } from '@angular/core';
import { ConvertComponent } from '../components/convert/convert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ConvertComponent ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  
}
