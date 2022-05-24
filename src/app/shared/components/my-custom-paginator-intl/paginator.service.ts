import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ResponseSchema, Tweet, TweetWithImage, User } from 'src/dtos';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  constructor(private http: HttpClient) { }

  @Output() aClickedEvent = new EventEmitter<PaginatorDto>();
  emit(pageIndex, pageSize) {
    this.aClickedEvent.emit({ index: pageIndex, size: pageSize });
  }

  getTweetCount(): Observable<ResponseSchema<number>> {
    return this.http.get<ResponseSchema<number>>("http://127.0.0.1:3000/getTweetsCount");
  }
}

export interface PaginatorDto {
  index: number,
  size: number
}