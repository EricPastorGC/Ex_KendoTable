import { Component } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult } from "@progress/kendo-angular-grid";
import * as data from './puestos.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public multiple = false;

  public gridData: any[] = (data as any).default;

  public sort: SortDescriptor[] = [
    {
      field: "puestoId",
      dir: "asc",
    },
  ];

  public gridView: GridDataResult = {
    data: orderBy(this.gridData, this.sort),
    total: this.gridData.length,
  };

  constructor() {
    this.loadData();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }

  private loadData(): void {
    this.gridView = {
      data: orderBy(this.gridData, this.sort),
      total: this.gridData.length,
    };
  }
}
