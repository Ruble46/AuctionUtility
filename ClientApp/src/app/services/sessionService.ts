import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../classes/classes";

@Injectable()
export class SessionService { 
    private apiURL: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl;
    }

    Login(user: User) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'session/login', JSON.stringify(user), options);
    }

    Logout() {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'session/logout', null, options);
    }

    Validate() {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.get<any>(this.apiURL + 'session/validate', options);
    }

    Register(user: User) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'session/register', JSON.stringify(user), options);
    }
}
