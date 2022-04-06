import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Bidder } from "../classes/classes";

@Injectable()
export class BiddersService { 
    private apiURL: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl;
    }

    Edit(bidder: Bidder) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'bidders/edit', JSON.stringify(bidder), options);
    }

    Add(bidder: Bidder) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'bidders/add', JSON.stringify(bidder), options);
    }

    GetSingle(bidderNumber: number) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response'
        };

        return this.http.get<any>(this.apiURL + 'bidders/single?bidderNumber=' + bidderNumber, options);
    }

    GetAll() {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response'
        };

        return this.http.get<any>(this.apiURL + 'bidders/all', options);
    }

    DeleteSingle(bidderNumber: number) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.delete<any>(this.apiURL + 'bidders/single?bidderNumber=' + bidderNumber, options);
    }

    DeleteAll(adminKey: string) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.delete<any>(this.apiURL + 'bidders/all?adminKey=' + adminKey, options);
    }
}
