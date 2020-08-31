import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { State } from '@progress/kendo-data-query';

interface structureTableUno {
  header: string;
  dataType: string;
  format: string;
  require: string;
}

interface dataTableUno {
  id: number;
  T1C1: number;
  T1C2: string;
  T1C3: number;
  T1C4: Date;
}

@Component({
  selector: 'app-table-data-uno',
  templateUrl: './table-data-uno.component.html',
  styleUrls: ['./table-data-uno.component.css']
})
export class TableDataUnoComponent implements OnInit {

  loadTable: number = 1;
  resServiceStructure: any;
  resUpdate: any;
  resAdd: any;

  gridDataColumn: Array<structureTableUno> = [];
  gridData: Array<dataTableUno> = [];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  formGroup: FormGroup;
  private editedRowIndex: number;
  idUpdate: number;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.loadTableStructure(this.loadTable);
    this.loadTableData();
  }

  loadTableStructure(id) {
    this.restService.restGetId(id, 'table-type').subscribe((res) => {
      this.resServiceStructure = res;
      this.resServiceStructure.columns.forEach(element => {
        this.gridDataColumn.push({ header: element.header, dataType: element.dataType, format: element.format, require: element.require });
      });
    })
  }

  loadTableData() {
    this.restService.restGet('table-data-uno').subscribe((res) => {
      res.forEach(element => {

        var formatDate = new Date(element.T1C4);
        this.gridData.push({ id: element.id, T1C1: element.T1C1, T1C2: element.T1C2, T1C3: element.T1C3, T1C4: formatDate });
      });
    });
  }
  
  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.idUpdate = dataItem.id;
    this.formGroup = new FormGroup({
      'T1C1': new FormControl(dataItem.T1C1, Validators.required),
      'T1C2': new FormControl(dataItem.T1C2),
      'T1C3': new FormControl(dataItem.T1C3),
      'T1C4': new FormControl(dataItem.T1C4),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }
  
  saveHandler({ sender, rowIndex, formGroup, isNew }) {

    if(isNew) {
      this.restService.restPost(formGroup.value, 'table-data-uno').subscribe((res) => {
        this.resAdd = res;
        this.gridData.push({ id: this.resAdd.id, T1C1: formGroup.value.T1C1, T1C2: formGroup.value.T1C2, T1C3: formGroup.value.T1C3, T1C4: formGroup.value.T1C4 })
      })

    } else {
      this.restService.restPut(this.idUpdate, formGroup.value, 'table-data-uno').subscribe((res) => {
        this.resUpdate = res;
        var formatDate = new Date(this.resUpdate.T1C4);

        this.gridData[rowIndex].T1C1 = parseFloat(this.resUpdate.T1C1);
        this.gridData[rowIndex].T1C2 = this.resUpdate.T1C2;
        this.gridData[rowIndex].T1C3 = parseFloat(this.resUpdate.T1C3);
        this.gridData[rowIndex].T1C4 = formatDate;
      })
    }

    sender.closeRow(rowIndex);
  }
  
  removeHandler({ dataItem }) {
    this.restService.restDelete(dataItem.id, 'table-data-uno').subscribe((res) => {
      this.gridData = [];
      this.loadTableData();
    })
  }

  addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'T1C1': new FormControl('', Validators.required),
      'T1C2': new FormControl(),
      'T1C3': new FormControl(),
      'T1C4': new FormControl(),
    });

    sender.addRow(this.formGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
