import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ResponseSchema, Tweet, User } from 'src/dtos';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    getAllTweets(): Observable<ResponseSchema<Tweet[]>> {
        return this.http.get<ResponseSchema<Tweet[]>>("http://127.0.0.1:3000/getAllTweets");
    }

    search(term: string): Observable<ResponseSchema<Tweet[]>> {
        return this.http.post<ResponseSchema<Tweet[]>>("http://127.0.0.1:3000/serachTweetByKeyword", { "keyword": term });
    }
}
