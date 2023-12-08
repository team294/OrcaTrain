import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
  }

  logout() {
    this.appService.logout();
    this.router.navigate(['/login']);
  }

}
