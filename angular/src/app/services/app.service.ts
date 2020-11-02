import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { UserInfo } from '../classes/userInfo';
import { UserLogin } from '../classes/userLogin';
import { Match } from '../classes/match';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AppService {
  private showMenu = false;
  private user: UserInfo;
  
  private webservice = 'http://bcrscout.com:8090';
  private eventId = '2020cadm';

  constructor(private http: HttpClient) {}

  public setUser(user: UserInfo) {
    if (user == null) {
      this.user = user;
      this.showMenu = false;
    } else {
      this.user = user;
      this.showMenu = true;
      localStorage.setItem('ORCA-USER', JSON.stringify(user));
      console.log("setting user with token "+user.token);
    }
  }

  // get the user from memory or local storage
  public getUser(): UserInfo {
    console.log('getUser()');
    if (!this.user) {
      console.log('getUser() user is null');
      this.setUser(JSON.parse(localStorage.getItem('ORCA-USER')));
      if (this.user) {
        console.log('getUser() got user from localstorage ' + this.user.username);
      } else {
        console.log('getUser() no user in localstorage');
      }
    } else {
      console.log('user is not null token:'+this.user.token);
    }
    return this.user;
  }  

  // login method
  public login(userLogin: UserLogin): Observable<UserInfo> {
    console.log('login for username:'+userLogin.username);

    // login to the server
    const url = this.getWebservice() + '/user/login';
    console.log(url);
    return this.http.post<UserInfo>(url, userLogin, this.getHttpOptions());
  }

  // get matches method
  public loadMatches(): Observable<Match[]> {
    console.log('getting matches');

    const url = this.getWebservice() + '/event/'+this.eventId+'/matches';
    console.log(url);
    return this.http.get<Match[]>(url, this.getHttpOptions());
  }  

  public logout() {
    this.showMenu = false;
    this.user = null;
    localStorage.removeItem('ORCA-USER');
  }

  // returns the webservice to use
  public getWebservice() {
    return this.webservice;
  }

  // return the token needed to communicate to the webservice
  public getToken(): string {
    var user = this.getUser();
    var token = "";
    if (user != null) {
      token = user.token;
    }
    return token;
  }

  // returns the http options with the necessary security token
  public getHttpOptions() {
    console.log("token for request:"+this.getToken());
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'AuthToken': this.getToken()
      })
    };
  }  
  public getShowMenu() {
    return this.showMenu;
  }
  public setShowMenu(value: boolean) {
    this.showMenu = value;
  }
}
