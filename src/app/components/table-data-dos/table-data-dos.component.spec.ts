import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataDosComponent } from './table-data-dos.component';

describe('TableDataDosComponent', () => {
  let component: TableDataDosComponent;
  let fixture: ComponentFixture<TableDataDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
