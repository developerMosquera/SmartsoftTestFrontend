import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit, OnDestroy {

  subscribeChangeDropdownlist: any;
  table: number = 1;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.detectedDropdownlistChange();
  }

  detectedDropdownlistChange() {
    this.subscribeChangeDropdownlist = this.appService.emitDropdownlistChange.subscribe((data) => {
      this.table = data.id;
    });
  }

  ngOnDestroy() {
    if (!!this.subscribeChangeDropdownlist) this.subscribeChangeDropdownlist.unsubscribe();
  }

}
