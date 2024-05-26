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
    public route: ActivatedRoute,
    public router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {
    this.currencies = [
      new Currency(1, "USD", "US Dollar", "The US Dollar is the official currency of the United States and its territories. It is the world's primary reserve currency and the most widely used currency in international transactions. Introduced in 1792, the USD is known for its stability and widespread acceptance.", "$"),
      new Currency(2, "EUR", "Euro", "The Euro is the official currency of the Eurozone, which consists of 19 of the 27 member states of the European Union. Introduced in 1999, it is the second most traded currency in the world and is used by over 340 million Europeans.", "€"),
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
      this.updateRate();
    }
  }

  swapCurrencies() {
    [this.from, this.to] = [this.to, this.from];

    this.refreshComponent();
  }

  changeCurrency(currency: Currency, type: number) {
    if (type === this.TYPE_FROM) {
      this.from = currency;
    }
    if (type === this.TYPE_TO) {
      this.to = currency;
    }

    this.refreshComponent();
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

  refreshComponent() {
    let queryParams = {
      amount: this.amountValue,
      from: this.from.code,
      to: this.to.code
    };

    this.router.navigate(['currency-converter'], { queryParams });
  }

  updateRate() {
    if (isNaN(parseFloat(this.amountValue))) {
      this.amount = 1;
      this.amountValue = '1.00';
    } else {
      this.amount = parseFloat(this.amountValue);
    }

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
