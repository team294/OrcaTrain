import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { User } from '../classes/user';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  public user: User;

  private webservice = 'http://localhost:8090';
  private token = '';


  public getWebservice() {
    return this.webservice;
  }

  // return the token needed to communicate to the webservice
  public getToken(): string {
    return this.token;
  }

  // returns the http options with the necessary security token
  public getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'AuthToken': this.getToken()
      })
    };
  }

  // webservice error handler
  public handleError(error: HttpErrorResponse) {
    console.log('error is '+error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // login method
  public login(userLogin: User): Observable<User> {
    console.log('login for username:'+userLogin.username);

    // login to the server
    const url = this.getWebservice() + '/login';
    console.log(url);
    return this.http.post<User>(url, userLogin, this.getHttpOptions())
    .pipe(
      catchError(this.handleError) // then handle the error
    );
    

  }

}
