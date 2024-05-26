import { Routes } from '@angular/router';
import { ConvertComponent } from '../components/convert/convert.component';

export const routes: Routes = [
    { path: 'currency-converter', component: ConvertComponent },
    { path: '',   redirectTo: '/currency-converter', pathMatch: 'full' }
];