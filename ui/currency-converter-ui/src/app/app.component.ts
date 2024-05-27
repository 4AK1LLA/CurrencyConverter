import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Currency } from '../models/currency';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  currencies: Currency[];

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
  }

  onOutletLoaded(component: any) {
    component.currencies = this.currencies;
  }
}
