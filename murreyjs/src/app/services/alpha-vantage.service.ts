import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {
  baseUrl = 'https://www.alphavantage.co/query?';
  apiKey = 'G5JH1DXPY57SNZ8C';
  intradayFunction = 'TIME_SERIES_INTRADAY';
  dailyFunction = 'TIME_SERIES_DAILY';

  constructor(private http: HttpClient) { }

  getIntradayPrices(symbol: string): Observable<any> {
    return this.http.get(this.baseUrl + 'function=' + this.intradayFunction + '&symbol=' + symbol + '&interval=60min&apikey=' + this.apiKey);
  }

  getDailyPrices(symbol: string): Observable<any> {
    return this.http.get(this.baseUrl + 'function=' + this.dailyFunction + '&symbol=' + symbol + '&apikey=' + this.apiKey);
  }

}
