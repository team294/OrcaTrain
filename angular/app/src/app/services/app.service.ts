import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { UserInfo } from '../classes/userInfo';
import { UserLogin } from '../classes/userLogin';
import { Match } from '../classes/match';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AppService {
  private showMenu = false;
  private user: UserInfo = {username: '', token: ''};
  
  private webservice = 'http://bcrscout.com:8090';
  private eventId = '2023cabl';

  constructor(private http: HttpClient) {}

  public setUser(user: UserInfo) {
    if (user == null) {
      this.user = user;
      this.showMenu = false;
    } else {
      this.user = user;
      this.showMenu = true;
      localStorage.setItem('ORCATRAIN-USER', JSON.stringify(user));
      console.log("setting user with token "+user.token);
    }
  }

  // get the user from memory or local storage
  public getUser(): UserInfo {
    console.log('getUser()', this.user);
    if (this.user.token == '') {
      console.log('getUser() user is null');
      let localUser = localStorage.getItem('ORCATRAIN-USER');
      if (localUser) {
        this.setUser(JSON.parse(localUser));
        console.log('getUser() got user from localstorage ', localUser);
        this.setShowMenu(true);
      } else {
        console.log('getUser() no user in localstorage');
      }
    } else {
      console.log('getUser() got user');
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
    this.user = {username: '', token: ''};;
    localStorage.removeItem('ORCATRAIN-USER');
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
