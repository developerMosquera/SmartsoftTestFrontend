import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { State } from '@progress/kendo-data-query';

interface structureTableTres {
  header: string;
  dataType: string;
  format: string;
  require: string;
}

interface dataTableTres {
  id: number;
  T3C1: number;
  T3C2: string;
  T3C3: Date;
}

@Component({
  selector: 'app-table-data-tres',
  templateUrl: './table-data-tres.component.html',
  styleUrls: ['./table-data-tres.component.css']
})
export class TableDataTresComponent implements OnInit {

  loadTable: number = 3;
  resServiceStructure: any;
  resUpdate: any;
  resAdd: any;

  gridDataColumn: Array<structureTableTres> = [];
  gridData: Array<dataTableTres> = [];
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
    this.restService.restGet('table-data-tres').subscribe((res) => {
      res.forEach(element => {

        var formatDate = new Date(element.T3C3);
        this.gridData.push({ id: element.id, T3C1: element.T3C1, T3C2: element.T3C2, T3C3: formatDate });
      });
    });
  }

  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.idUpdate = dataItem.id;
    this.formGroup = new FormGroup({
      'T3C1': new FormControl(dataItem.T3C1, Validators.required),
      'T3C2': new FormControl(dataItem.T3C2, Validators.required),
      'T3C3': new FormControl(dataItem.T3C3, Validators.required),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }) {

    if(isNew) {
      this.restService.restPost(formGroup.value, 'table-data-tres').subscribe((res) => {
        this.resAdd = res;
        this.gridData.push({ id: this.resAdd.id, T3C1: formGroup.value.T3C1, T3C2: formGroup.value.T3C2, T3C3: formGroup.value.T3C3 })
      })

    } else {
      this.restService.restPut(this.idUpdate, formGroup.value, 'table-data-tres').subscribe((res) => {
        this.resUpdate = res;
        var formatDate = new Date(this.resUpdate.T3C3);

        this.gridData[rowIndex].T3C1 = parseFloat(this.resUpdate.T3C1);
        this.gridData[rowIndex].T3C2 = this.resUpdate.T3C2;
        this.gridData[rowIndex].T3C3 = formatDate;
      })
    }

    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem }) {
    this.restService.restDelete(dataItem.id, 'table-data-tres').subscribe((res) => {
      this.gridData = [];
      this.loadTableData();
    })
  }

  addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'T3C1': new FormControl('', Validators.required),
      'T3C2': new FormControl('', Validators.required),
      'T3C3': new FormControl('', Validators.required)
    });

    sender.addRow(this.formGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
