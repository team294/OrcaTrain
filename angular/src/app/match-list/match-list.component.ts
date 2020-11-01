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
        this.appService.matchList = data as Match[];
        if (this.appService.matchList == null) {
          console.log("matches loaded: null");
        } else {
          console.log("matches loaded: "+this.appService.matchList.length);
        }
      })
  }

  getMatches() {
    return this.appService.matchList;
  }

}
