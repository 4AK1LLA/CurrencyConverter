import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-convert',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: 'convert.component.html',
  styleUrl: 'convert.component.css'
})
export class ConvertComponent {
  currencies: Currency[];
  from: Currency;
  to: Currency;

  ngOnInit() {
    this.currencies = [
      new Currency(1, "USD", "US Dollar", "", "$"),
      new Currency(2, "EUR", "Euro", "", "€"),
      new Currency(3, "UAH", "Ukrainian Hryvnia", "", "₴"),
      new Currency(4, "BTC", "Bitcoin", "", "₿")
    ];

    this.from = this.currencies[0];
    this.to = this.currencies[1];
  }

  swapCurrencies() {
    [this.from, this.to] = [this.to, this.from];
  }

  changeCurrencyFrom(currency: Currency) {
    this.from = currency;
  }

  changeCurrencyTo(currency: Currency) {
    this.to = currency;
  }
}

class Currency {
  id: number;
  code: string;
  displayName: string;
  description: string;
  symbol: string;

  constructor(id:number, code: string, displayName: string, description: string, symbol: string) {
    this.id = id;
    this.code = code;
    this.displayName = displayName;
    this.description = description;
    this.symbol = symbol;
  }
}
