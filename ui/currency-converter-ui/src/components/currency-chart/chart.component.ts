import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-convert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'chart.component.html',
  styleUrl: 'chart.component.css'
})
export class ChartComponent {
  public readonly TYPE_FROM = 1;
  public readonly TYPE_TO = 2;
  currencies: Currency[];
  from: Currency;
  to: Currency;
  showCurrencies: Currency[];
  chart: any;
  period: string;
  periods: string[];

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

    this.periods = ['hour', 'day', 'week', 'month', 'year'];

    let periodParam = this.route.snapshot.queryParamMap.get('period');
    this.period = this.periods.includes(periodParam || '') ? periodParam! : this.periods[3];

    let fromCode = this.route.snapshot.queryParamMap.get('from');
    this.from = this.currencies.find(currency => currency.code === fromCode) || this.currencies[0];

    let toCode = this.route.snapshot.queryParamMap.get('to');
    this.to = this.currencies.find(currency => currency.code === toCode) || this.currencies[1];

    if (periodParam && fromCode && toCode) {
      this.createChart();
    }
  }

  createChart() {
    let data = [
      { date: '2024-05-24T05:00:00', rate: 34.2343 },
      { date: '2024-05-25T07:00:00', rate: 34.512 },
      { date: '2024-05-25T23:00:00', rate: 34.35534 },
      { date: '2024-05-26T07:00:00', rate: 34.2356 },
      { date: '2024-05-26T23:00:00', rate: 34.3356 },
      { date: '2024-05-27T07:00:00', rate: 34.201 }
    ];

    this.chart = new Chart('currency-chart', {
      type: 'line',
      data: {
        labels: data.map(row => new DatePipe('en-US').transform(new Date(row.date), 'dd:MM:yyyy HH:mm:ss')),
        datasets: [{
          label: 'Rate',
          data: data.map(row => row.rate),
          tension: 0.2
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  swapCurrencies() {
    [this.from, this.to] = [this.to, this.from];

    if (this.chart) {
      this.onParamsUpdate();
    }
  }

  changeCurrency(currency: Currency, type: number) {
    if (type === this.TYPE_FROM) {
      this.from = currency;
    }
    if (type === this.TYPE_TO) {
      this.to = currency;
    }

    if (this.chart) {
      this.onParamsUpdate();
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

  onParamsUpdate() {
    let queryParams = {
      period: this.period,
      from: this.from.code,
      to: this.to.code
    };

    this.router.navigate(['currency-chart'], { queryParams });
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
