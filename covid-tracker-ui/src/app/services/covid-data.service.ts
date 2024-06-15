import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  private apiUrl = 'https://api.covidtracking.com/v1/states';

  constructor(private http: HttpClient) { }

  getDailyData(state: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${state}/daily.json`);
  }
  getStateInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/info.json`);
  }
}
