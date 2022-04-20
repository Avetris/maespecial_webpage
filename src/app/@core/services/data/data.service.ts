import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    protected adminPath = ""
    protected anonyPath = ""

    constructor(protected http: HttpClient) {
        const host = isDevMode() ? "http://localhost:4500" : `https://${window.location.hostname}`;
        this.adminPath = `${host}/api/admin`;
        this.anonyPath = `${host}/api/anony`
    }
}