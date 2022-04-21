import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchbarService {

    @Output() aClickedEvent = new EventEmitter<string>();
    constructor() { }

    search(term: string) {
        this.aClickedEvent.emit(term);
    }

}
