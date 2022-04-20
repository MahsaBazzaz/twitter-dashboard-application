import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { keyword, ResponseSchema, Tweet, User } from 'src/dtos';

@Injectable({
    providedIn: 'root'
})
export class KeywordsService {
    
    constructor(private http: HttpClient) { }

    getAllKeywords() : Observable<ResponseSchema<keyword[]>>{
        return this.http.get<ResponseSchema<keyword[]>>("http://127.0.0.1:3000/getAllKeywords");
    }
}
