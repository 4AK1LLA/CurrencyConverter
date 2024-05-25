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
  public readonly TYPE_FROM = 1;
  public readonly TYPE_TO = 2;
  currencies: Currency[];
  from: Currency;
  to: Currency;
  showCurrencies: Currency[];

  ngOnInit() {
    this.currencies = [
      new Currency(1, "USD", "US Dollar", "", "$"),
      new Currency(2, "EUR", "Euro", "", "€"),
      new Currency(3, "UAH", "Ukrainian Hryvnia", "", "₴"),
      new Currency(4, "BTC", "Bitcoin", "", "₿")
    ];

    this.from = this.currencies[0];
    this.to = this.currencies[1];

    this.showCurrencies = this.currencies;
  }

  swapCurrencies() {
    [this.from, this.to] = [this.to, this.from];
  }

  changeCurrency(currency: Currency, type: number) {
    if (type === this.TYPE_FROM) {
      this.from = currency;
    }
    if (type === this.TYPE_TO) {
      this.to = currency;
    }
  }

  onCurrencyInputClear(event: any) {
    event.target.value = '';
  }

  onCurrencyInputRefresh(event: any, type: number) {
    this.showCurrencies = this.currencies;

    // timeout to prevent wrong currency name displaying
    setTimeout(() => event.target.value = type === this.TYPE_FROM ? this.from.getDisplay() : this.to.getDisplay(), 100);
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

  getDisplay(): string {
    return this.code + ' - ' + this.displayName;
  }
}
