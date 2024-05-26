import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-convert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'convert.component.html',
  styleUrl: 'convert.component.css'
})
export class ConvertComponent {
  public readonly TYPE_FROM = 1;
  public readonly TYPE_TO = 2;
  scales = [ 1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000 ];
  currencies: Currency[];
  from: Currency;
  to: Currency;
  showCurrencies: Currency[];
  amountValue: string;
  amount: number;
  rate: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.currencies = [
      new Currency(1, "USD", "US Dollar", "", "$"),
      new Currency(2, "EUR", "Euro", "", "€"),
      new Currency(3, "UAH", "Ukrainian Hryvnia", "", "₴"),
      new Currency(4, "BTC", "Bitcoin", "", "₿"),
      new Currency(5, "JPY", "Japanese Yen", "", "¥"),
      new Currency(6, "GBP", "British Pound", "", "£"),
      new Currency(7, "AUD", "Australian Dollar", "", "A$"),
      new Currency(8, "CAD", "Canadian Dollar", "", "C$"),
      new Currency(9, "CHF", "Swiss Franc", "", "CHF"),
      new Currency(10, "CNY", "Chinese Yuan", "", "¥"),
      new Currency(11, "SEK", "Swedish Krona", "", "kr"),
      new Currency(12, "NZD", "New Zealand Dollar", "", "NZ$")
    ];

    this.showCurrencies = this.currencies;

    let amount = this.route.snapshot.queryParamMap.get('amount');
    this.amountValue = !isNaN(parseFloat(amount || '')) ? amount! : '1.00';

    let fromCode = this.route.snapshot.queryParamMap.get('from');
    this.from = this.currencies.find(currency => currency.code === fromCode) || this.currencies[0];

    let toCode = this.route.snapshot.queryParamMap.get('to');
    this.to = this.currencies.find(currency => currency.code === toCode) || this.currencies[1];

    if (amount && fromCode && toCode) {
      this.convert();
    }
  }

  swapCurrencies() {
    [this.from, this.to] = [this.to, this.from];

    if (this.rate) {
      this.onConvertClick();
    }
  }

  changeCurrency(currency: Currency, type: number) {
    if (type === this.TYPE_FROM) {
      this.from = currency;
    }
    if (type === this.TYPE_TO) {
      this.to = currency;
    }

    if (this.rate) {
      this.onConvertClick();
    }
  }

  onCurrencyInputClear(event: any) {
    event.target.value = '';
    this.showCurrencies = this.currencies;
  }

  onCurrencyInputRefresh(event: any, type: number) {
    // timeout to prevent wrong currency name displaying
    setTimeout(() => event.target.value = type === this.TYPE_FROM ? this.from.getDisplay() : this.to.getDisplay(), 100);
  }

  onCurrencyInputLiveSearch(event: any) {
    let query = event.target.value.toLowerCase();

    this.showCurrencies = this.currencies.filter(currency =>
      currency.code.toLowerCase().includes(query) || currency.displayName.toLowerCase().includes(query)
    );
  }

  getDecimalDigits(number: number): string {
    let formatted = number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
    let index = formatted.indexOf('.');
    return formatted.slice(index + 3, formatted.length);
  }

  onConvertClick() {
    let queryParams = {
      amount: this.amountValue,
      from: this.from.code,
      to: this.to.code
    };

    this.router
      .navigate(['currency-converter'], { queryParams })
      .then(() => this.convert());
  }

  convert() {
    this.amount = 2.00;
    this.rate = 34.3423563;
  }
}

class Currency {
  id: number;
  code: string;
  displayName: string;
  description: string;
  symbol: string;

  constructor(id: number, code: string, displayName: string, description: string, symbol: string) {
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
