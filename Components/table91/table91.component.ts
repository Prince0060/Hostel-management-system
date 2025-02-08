import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Table91Pipe } from '../../Pipe/table91.pipe';

@Component({
  standalone: true,
  imports: [RouterModule, MatPaginatorModule, CommonModule, MatTableModule, MatCheckboxModule, Table91Pipe
    , MatButtonModule],
  selector: 'app-table91',
  templateUrl: './table91.component.html',
  styleUrls: ['./table91.component.scss'],
})
export class Table91Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() tableTitle!: string;
  @Input() linkOne!: string;
  @Input() linkEdit!: string;
  @Input() displayedColumns!: string[];
  @Input() dataSource!: MatTableDataSource<any>;
  @Output() onDeleteButton: EventEmitter<any> = new EventEmitter();
  selection = new SelectionModel<any>(true, []);
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
