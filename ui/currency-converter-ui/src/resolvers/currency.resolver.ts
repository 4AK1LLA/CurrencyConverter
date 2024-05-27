import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency';

export const currencyResolver: ResolveFn<Currency[]> = (): Observable<Currency[]> => {
    const http = inject(HttpClient);
    return http.get<Currency[]>('https://localhost:7293/currencies');
}