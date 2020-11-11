import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../classes/match';
import { AppService } from '../services/app.service';
import { Chart } from  'chart.js';
import { fromEventPattern } from 'rxjs';
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
  nameList: string[];
  goalList:number[];
  tempNameList:string[];
  tempGoalList:number[];
  chart: Chart;

  ngOnInit(): void {
    
    setTimeout(() => {  this.loadMatches();; }, 100);
    this.matchList = [];
    this.nameList = [];
    this.tempNameList = [];
    this.tempGoalList = [];
    this.goalList = [];
    setTimeout(() => {  this.createChart(); }, 100);  
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

  createLists() {
    console.log(this.getMatches().length+"Length");
    let counter = 0;
    let counted = false;
    for(var i = 0; i < this.getMatches().length;i++){
      counted=false;
      if(this.matchList[i].teleopHighGoals != 0 || this.matchList[i].teleopMidGoals !=0){
        for(var d = 0; d<this.tempNameList.length; d++){
          if(this.tempNameList[d] == this.matchList[i].teamId){
            this.tempGoalList[d]+= this.matchList[i].teleopHighGoals + this.matchList[i].teleopMidGoals;
            counted = true;
          }
        }
        if(!counted){
          this.tempNameList[i-counter] = this.matchList[i].teamId;
          this.tempGoalList[i-counter] = this.matchList[i].teleopHighGoals+this.matchList[i].teleopMidGoals;
        }
        
      }else{
        counter++;
      }
      
    }
    
    counter = 0;
    for(var i = 0; i < this.tempNameList.length; i++) {
      if(this.tempNameList[i] != undefined) {
        this.nameList[counter]=this.tempNameList[i];
        this.goalList[counter]=this.tempGoalList[i];
        counter++;
      }
    }
  }

  createChart() {
    this.createLists();
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.nameList,
        datasets: [
          {
            data: this.goalList,
            backgroundColor: "Chocolate",
            hoverBackgroundColor: "Chocolate"
          }
        ] 
      },
      options: {
          legend: {
              display: false
          }
      }
    });
  
  }

}
