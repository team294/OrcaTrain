import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private appService: AppService,
    private router: Router    
  ) { }

  user: User = new User();

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/user-list']);
  }

}
