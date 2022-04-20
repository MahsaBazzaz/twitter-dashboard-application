import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private sub = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient) { }
    gettingData() {
        return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(map(res => res))
    }
    returnAsObservable() {
        return this.sub.asObservable();
    }
    showSpinner() {
        this.sub.next(true);
    }
    hideSpinner() {
        this.sub.next(false);
    }
}