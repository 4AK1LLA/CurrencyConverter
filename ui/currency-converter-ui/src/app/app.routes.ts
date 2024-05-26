import { Routes } from '@angular/router';
import { ConvertComponent } from '../components/convert/convert.component';
import { ChartComponent } from '../components/currency-chart/chart.component';

export const routes: Routes = [
    { path: 'currency-converter', component: ConvertComponent },
    { path: 'currency-chart', component: ChartComponent },
    { path: '',   redirectTo: '/currency-converter', pathMatch: 'full' }
];