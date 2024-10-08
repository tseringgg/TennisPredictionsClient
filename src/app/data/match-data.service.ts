import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config-model';
import { Match } from '../models/match-model';

@Injectable({
  providedIn: 'root'
})

export class MatchDataService {
  //url = 'assets/test.json';
  url = 'http://localhost:5146/api/MatchRecords'
  constructor(private http: HttpClient) { 
    
  }

  getMatches() {
    let result = this.http.get<any[]>(this.url, {observe: 'response'});
    console.log(result);
    return result;
    // For HTTP Params:
    // https://v17.angular.io/guide/http-configure-http-url-parameters
    // example: api/heroes?name=cat
  }
}
