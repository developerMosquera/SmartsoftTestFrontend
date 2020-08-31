import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataUnoComponent } from './table-data-uno.component';

describe('TableDataUnoComponent', () => {
  let component: TableDataUnoComponent;
  let fixture: ComponentFixture<TableDataUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDataUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
