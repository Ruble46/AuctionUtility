import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Donation } from "../classes/classes";

@Injectable()
export class DonationsService { 
    private apiURL: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl;
    }

    Add(donation: Donation) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'donations/add', JSON.stringify(donation), options);
    }

    Edit(donation: Donation) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'donations/edit', JSON.stringify(donation), options);
    }

    GetAll() {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response'
        };

        return this.http.get<any>(this.apiURL + 'donations/all', options);
    }

    DeleteSingle(id: string) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.delete<any>(this.apiURL + 'donations/single?id=' + id, options);
    }
}
