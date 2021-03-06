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

    search(term: string): Observable<ResponseSchema<keyword[]>> {
        return this.http.post<ResponseSchema<keyword[]>>("http://127.0.0.1:3000/serachKeywords", { "keyword": term });
    }

    add(keyword: string): Observable<ResponseSchema<keyword>> {
        return this.http.post<ResponseSchema<keyword>>("http://127.0.0.1:3000/addKeyword", { "keyword": keyword });
    }

    remove(keyword: string): Observable<ResponseSchema<any>> {
        return this.http.post<ResponseSchema<any>>("http://127.0.0.1:3000/removeKeyword", { "keyword": keyword });
    }
}
