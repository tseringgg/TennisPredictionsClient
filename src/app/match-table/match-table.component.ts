import { Component, OnInit } from '@angular/core';
import { MatchDataService } from '../data/match-data.service';
import { Config } from '../models/config-model';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { CommonModule, NgFor } from '@angular/common';
import { Match } from '../models/match-model';

@Component({
  selector: 'app-match-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './match-table.component.html',
  styleUrl: './match-table.component.scss'
})
export class MatchTableComponent implements OnInit {
  private matchData: Match[] | null = null;
  data: Match[] = []
  dataIsLoaded = false
  headers: any;
  constructor(private matchDataService: MatchDataService) {
    //this.showMatchData();
    
  }
  ngOnInit(): void {
    this.showMatchData();

  }
  showMatchData() {
    this.matchDataService.getMatches()
      /*.subscribe(data => this.matchData = {
        heroesUrl: data.heroesUrl,
        textfile: data.textfile,
        date: data.date,
      });*/
      //.subscribe(data => this.matchData = {...data }) // destructured assignment, to clone the data object (this was used without any options on the http.get())

      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`
        //this.matchData = {...resp.body! }
        this.matchData = resp.body as Match[];
        // alert(this.matchData.heroesUrl);
        console.log(this.matchData);
        console.log('break');
        if(this.matchData != undefined)
          this.data = this.matchData;
        // for(let m of this.matchData) {
        //   this.data.push(m);
        // }
        this.dataIsLoaded = true;
      })
  }
}
