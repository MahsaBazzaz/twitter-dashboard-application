import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    @Output() aClickedEvent = new EventEmitter<string>();
    constructor() { }

    emitevent(term: string) {
        this.aClickedEvent.emit(term);
    }

}