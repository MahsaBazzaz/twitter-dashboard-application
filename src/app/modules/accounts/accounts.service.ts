import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseSchema, User } from 'src/dtos';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {

    constructor(private http: HttpClient) { }

    getAllUsers() : Observable<ResponseSchema<User[]>>{
        return this.http.get<ResponseSchema<User[]>>("http://127.0.0.1:3000/getAllUsers");
    }
}
