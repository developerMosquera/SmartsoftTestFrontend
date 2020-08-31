import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AppService } from '../../services/app.service';

import { environment } from '../../../environments/environment';

interface Item {
  id: string,
  name: string
}

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  dataResService: any;

  listItems: Array<Item> = [];
  defaultItem: any;

  constructor(private restService: RestService, private appService: AppService) { }

  ngOnInit(): void {
    this.loadTablesType();  
  }

  loadTablesType() {
    this.restService.restGet('table-type').subscribe((res) => {
      this.dataResService = res;

      this.pushTablesType(this.dataResService).then(() =>  {
        this.defaultItem = this.listItems[environment.valueDefaultDropdownlist];
      })
    })
  }

  pushTablesType(data) {
    return new Promise<any>((resolve) => {
      data.forEach(element => {
        this.listItems.push({ id: element.id, name: element.name });
      });
      
      resolve(true);
    })
  }

  valueDropdownlistChange(event) {
    this.appService.dropdownlistChange(event);
  }

}
