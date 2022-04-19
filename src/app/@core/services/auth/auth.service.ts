import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

 @Injectable()
export class AuthService {
    
    loggedIn: Subject<boolean>;
    apiUrl: string;

    constructor(private http: HttpClient) {
       // this.apiUrl = `https://${window.location.hostname}/api/admin`;        
        this.apiUrl = `http://localhost:4500/api/admin`;        
        this.loggedIn = new Subject();
        this.getLogin();
    }

    isAuth(): Promise<boolean> {
        const url = "/account/check";
        return this.http.get(this.apiUrl + "/check-auth")
          .toPromise()
          .then(response=> {return true})
          .catch(error=> {console.log("ERROR");return false})
    }

    doLogin(username: string, password: string) {
        this.http.post(this.apiUrl + '/login', {
          username: username,
          password: password
        }, {
          withCredentials: true
        }).subscribe((resp: any) => {
          this.loggedIn.next(true);
        }, (errorResp) => {
          this.loggedIn.next(false);
        });
    }

    getLogin() {
        this.http.get(this.apiUrl + '/login', {
          withCredentials: true // <=========== important!
        }).subscribe((resp: any) => {
          this.loggedIn.next(resp.loggedIn);
        })
    }
    
    logout() {
        this.http.post(this.apiUrl + '/logout', {}, {
          withCredentials: true
        }).subscribe(() => {
          this.loggedIn.next(false);
        });
    }
}