import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResponseSchema, Tweet, User } from 'src/dtos';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    
    constructor(private http: HttpClient) { }

    getAllUsers() : Observable<ResponseSchema<Tweet[]>>{
        return this.http.get<ResponseSchema<Tweet[]>>("http://127.0.0.1:3000/getAllTweets");
    }
}
