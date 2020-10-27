import { Component, OnInit } from '@angular/core';

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
  ) { }

  user: User = new User();

  ngOnInit(): void {
  }

  login() {
    console.log('login.component login username:'+this.user.username);
    this.appService
      .login(this.user)
      .subscribe(data => {
          if (data) {
            console.log('login successful token: ' + data.token);
            this.appService.user = data;
          } else {
            console.log('login got null token');
          }
        }
      )
    }
   

}
