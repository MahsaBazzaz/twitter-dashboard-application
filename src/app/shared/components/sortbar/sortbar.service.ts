import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SortbarService {

    @Output() aClickedEvent = new EventEmitter<({data : string, order : boolean})>();
    constructor() { }

    sort(by : string, order : boolean) {
        this.aClickedEvent.emit({data : by, order : order});
    }
}
