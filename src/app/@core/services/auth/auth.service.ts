import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

 @Injectable()
export class AuthService {
    
    loggedIn: boolean = false;
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = isDevMode() ? "http://localhost:4500/api/admin" : `https://${window.location.hostname}/api/admin`;
        this.isAuth();
    }

    isAuth(): Promise<boolean> {
        return this.http.get(this.apiUrl + "/check-auth",{
            withCredentials: true
        }).toPromise()
          .then(response=> {
            this.loggedIn = true;
            return true
        }).catch(error=> {
            this.loggedIn = false;
            return false
        })
    }

    doLogin(username: string, password: string) : Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/login', {
                username: username,
                password: password
            }, {
                withCredentials: true
            }).subscribe((resp: any) => {
                this.loggedIn = true;
                resolve(true);
            }, (errorResp) => {
                console.log(errorResp)
                this.loggedIn = false;                
                resolve(false);
            });
        });
    }
    
    logout() {
        this.http.post(this.apiUrl + '/logout', {}, {
          withCredentials: true
        }).subscribe(() => {
          this.loggedIn = false;
        });
    }
}