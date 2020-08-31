import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataTresComponent } from './table-data-tres.component';

describe('TableDataTresComponent', () => {
  let component: TableDataTresComponent;
  let fixture: ComponentFixture<TableDataTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
