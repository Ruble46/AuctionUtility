import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Lot } from "../classes/classes";

@Injectable()
export class LotsService { 
    private apiURL: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiURL = baseUrl;
    }

    Edit(lot: Lot) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'lots/edit', JSON.stringify(lot), options);
    }

    Add(lot: Lot) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.post<any>(this.apiURL + 'lots/add', JSON.stringify(lot), options);
    }

    GetSingle(lotNumber: number) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response'
        };

        return this.http.get<any>(this.apiURL + 'lots/single?lotNumber=' + lotNumber, options);
    }

    GetAll() {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response'
        };

        return this.http.get<any>(this.apiURL + 'lots/all', options);
    }

    DeleteSingle(lotNumber: number) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.delete<any>(this.apiURL + 'lots/single?lotNumber=' + lotNumber, options);
    }

    DeleteAll(adminKey: string) {
        let options: Object;

        options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
            observe: 'response',
            responseType: 'text'
        };

        return this.http.delete<any>(this.apiURL + 'lots/all?adminKey=' + adminKey, options);
    }
}
