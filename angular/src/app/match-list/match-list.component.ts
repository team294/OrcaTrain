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
  options: any;

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
          this.loadGraph();
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

  getTeleopForTeam(teamId:string) : number {
    var total: number = 0;
    for (const m of this.matchList) {
      if (teamId === m.teamId) {
        total += m.teleopHighGoals;
        total += m.teleopMidGoals;
        total += m.teleopLowGoals;
      }
    }    
    return total;
  }

  getAutoForTeam(teamId:string) : number {
    var total: number = 0;
    for (const m of this.matchList) {
      if (teamId === m.teamId) {
        total += m.autoHighGoals;
        total += m.autoMidGoals;
        total += m.autoLowGoals;
      }
    }    
    return total;
  }

  loadGraph() {
    console.log('loading graph');
    const xAxisData = [];
    const autoData = [];
    const teleopData = [];
    const teamSet = new Set <string> ();

    // build a set of teams
    for (const m of this.matchList) {
      teamSet.add(m.teamId);
    }

    // summarize the data for each team
    for (const t of Array.from(teamSet)) {
      xAxisData.push(t);
      autoData.push(this.getAutoForTeam(t));
      teleopData.push(this.getTeleopForTeam(t));
    }

    this.options = {
      legend: {
        data: ['Auto','Teleop'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Auto',
          type: 'bar',
          data: autoData,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'Teleop',
          type: 'bar',
          data: teleopData,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

}
