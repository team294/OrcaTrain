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

  userLogin: UserLogin = {username: '', password: ''};
  userInfo: UserInfo | undefined;
  errorMessage = '';

  ngOnInit(): void {}

  login() {
    this.errorMessage = "Connecting to server ..."
    this.appService.login(this.userLogin)
      .subscribe((data) => {
        this.errorMessage = "Response received"
        if (data) {
          this.errorMessage = "Login success"
          this.appService.setShowMenu(true);
          this.appService.setUser(data);
          this.router.navigate(['/main']);
        } else {
          this.errorMessage = "Login failed"
        }
      })
  }

}
