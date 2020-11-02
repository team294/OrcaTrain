import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../classes/match';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  private matchList: Match[];

  constructor(
    private appService: AppService,
    private router: Router    
  ) {};

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.appService.loadMatches()
      .subscribe((data) => {
        this.matchList = data as Match[];
        this.matchList.sort(this.sortByTeamThenMatch);
        if (this.matchList == null) {
          console.log("matches loaded: null");
        } else {
          console.log("matches loaded: "+this.matchList.length);
        }
      })
  }

  sortByTeamThenMatch(a: Match, b: Match) {
    const na = parseInt(a.teamId, 10)*10000+parseInt(a.matchNumber,10);
    const nb = parseInt(b.teamId, 10)*10000+parseInt(b.matchNumber,10);
    return na - nb;
  }

  getMatches() {
    return this.matchList;
  }

}
