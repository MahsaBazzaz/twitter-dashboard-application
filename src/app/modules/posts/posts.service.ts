import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ResponseSchema, Tweet, TweetWithImage, User } from 'src/dtos';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    getAllTweets(index, size): Observable<ResponseSchema<TweetWithImage[]>> {
        return this.http.post<ResponseSchema<TweetWithImage[]>>("http://127.0.0.1:3000/getAllTweets", { "offset": index , "size" : size });
    }

    search(term: string): Observable<ResponseSchema<TweetWithImage[]>> {
        return this.http.post<ResponseSchema<TweetWithImage[]>>("http://127.0.0.1:3000/serachTweetByKeyword", { "keyword": term });
    }

    sortByLikes(order: boolean): Observable<ResponseSchema<TweetWithImage[]>> {
        return this.http.post<ResponseSchema<TweetWithImage[]>>("http://127.0.0.1:3000/sortTweetsByLikes", { "order": order });
    }

    sortByRetweets(order: boolean): Observable<ResponseSchema<TweetWithImage[]>> {
        return this.http.post<ResponseSchema<TweetWithImage[]>>("http://127.0.0.1:3000/sortTweetsByRetweets", { "order": order });
    }

    sortByDate(order: boolean): Observable<ResponseSchema<TweetWithImage[]>> {

        return this.http.post<ResponseSchema<TweetWithImage[]>>("http://127.0.0.1:3000/sortTweetsByDate", { "order": order });
    }
}
