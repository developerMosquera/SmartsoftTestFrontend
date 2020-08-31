import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { State } from '@progress/kendo-data-query';

interface structureTableDos {
  header: string;
  dataType: string;
  format: string;
  require: string;
}

interface dataTableDos {
  id: number;
  T2C1: string;
  T2C2: string;
  T2C3: number;
  T2C4: Date;
  T2C5: number;
}

@Component({
  selector: 'app-table-data-dos',
  templateUrl: './table-data-dos.component.html',
  styleUrls: ['./table-data-dos.component.css']
})
export class TableDataDosComponent implements OnInit {

  loadTable: number = 2;
  resServiceStructure: any;
  resUpdate: any;
  resAdd: any;

  gridDataColumn: Array<structureTableDos> = [];
  gridData: Array<dataTableDos> = [];
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
    this.restService.restGet('table-data-dos').subscribe((res) => {
      res.forEach(element => {

        var formatDate = new Date(element.T2C4);
        this.gridData.push({ id: element.id, T2C1: element.T2C1, T2C2: element.T2C2, T2C3: element.T2C3, T2C4: formatDate, T2C5: element.T2C5 });
      });
    });
  }
  
  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.idUpdate = dataItem.id;
    this.formGroup = new FormGroup({
      'T2C1': new FormControl(dataItem.T2C1, Validators.required),
      'T2C2': new FormControl(dataItem.T2C2),
      'T2C3': new FormControl(dataItem.T2C3),
      'T2C4': new FormControl(dataItem.T2C4, Validators.required),
      'T2C5': new FormControl(dataItem.T2C5, Validators.required),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }
  
  saveHandler({ sender, rowIndex, formGroup, isNew }) {

    if(isNew) {
      this.restService.restPost(formGroup.value, 'table-data-dos').subscribe((res) => {
        this.resAdd = res;
        this.gridData.push({ id: this.resAdd.id, T2C1: formGroup.value.T2C1, T2C2: formGroup.value.T2C2, T2C3: formGroup.value.T2C3, T2C4: formGroup.value.T2C4, T2C5: formGroup.value.T2C5 })
      })

    } else {
      this.restService.restPut(this.idUpdate, formGroup.value, 'table-data-dos').subscribe((res) => {
        this.resUpdate = res;
        var formatDate = new Date(this.resUpdate.T2C4);

        this.gridData[rowIndex].T2C1 = this.resUpdate.T2C1;
        this.gridData[rowIndex].T2C2 = this.resUpdate.T2C2;
        this.gridData[rowIndex].T2C3 = parseFloat(this.resUpdate.T2C3);
        this.gridData[rowIndex].T2C4 = formatDate;
        this.gridData[rowIndex].T2C5 = parseFloat(this.resUpdate.T2C5);
      })
    }

    sender.closeRow(rowIndex);
  }
  
  removeHandler({ dataItem }) {
    this.restService.restDelete(dataItem.id, 'table-data-dos').subscribe((res) => {
      this.gridData = [];
      this.loadTableData();
    })
  }

  addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'T2C1': new FormControl('', Validators.required),
      'T2C2': new FormControl(),
      'T2C3': new FormControl(),
      'T2C4': new FormControl('', Validators.required),
      'T2C5': new FormControl('', Validators.required),
    });

    sender.addRow(this.formGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
