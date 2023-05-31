import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Preference } from "../classes/classes";

@Injectable()
export class PreferencesService { 
    private apiURL: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl;
    }

    Get() {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'json'
        };

        return this.http.get<any>(this.apiURL + 'preferences', options);
    }

    Save(pref: Preference) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'preferences', JSON.stringify(pref), options);
    }
}
