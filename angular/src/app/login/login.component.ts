import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../classes/userInfo';
import { UserLogin } from '../classes/userLogin';
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

  userLogin: UserLogin = new UserLogin();
  userInfo: UserInfo = null;
  errorMessage: string = null;

  ngOnInit(): void {}

  login() {
    this.errorMessage = "Connecting to server ..."
    this.appService.login(this.userLogin)
      .subscribe((data) => {
        this.errorMessage = "Response received"
        if (data) {
          this.errorMessage = "Login success"
          this.appService.showMenu = true;
          console.log("token from data in login:"+data.token);
          this.appService.setUser(data);
          this.router.navigate(['/main']);
        } else {
          this.errorMessage = "Login failed"
        }
      })
  }

}
