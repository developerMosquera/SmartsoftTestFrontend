import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() emitDropdownlistChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  dropdownlistChange(data) {
    this.emitDropdownlistChange.emit(data);
  }
  
}
