import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConfigService } from '../config-services';

@Injectable({
  providedIn: 'root'
})
export class GetStationsService {

  readonly URL_API = this.config.getConfig().apiAqi.url

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getStationsByCity (city: String) {
    return this.http.get(`${this.URL_API}/aqi/search-city/${city}`)
  }
}
