import { Component, OnInit } from '@angular/core';
import { SortDescriptor, orderBy, State, DataResult, process } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
//import * as data from './puestos.json';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './_services/api.service';

const gridInitialState: State = {
  skip: 0,
  take: 20,
  sort: [
    {
      field: 'puestoId',
      dir: 'asc'
    }
  ],
  filter: {
    logic: 'and',
    filters: []
  },
  group: []
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public gridCurrentState: State = gridInitialState;

  puestos: any = [];

  public multiple = false;
  public pageSize = 10;
  public skip = 0;
  public take = 0;
  public pageSizes = true;
  public previousNext = true;

  public sort: SortDescriptor[] = [
    {
      field: "puestoId",
      dir: "asc",
    },
  ];

  public state: State = {
    skip: 0,
    take: 15,
  };

  public gridView: GridDataResult = {
    data: [],
    total: 0
  };

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.loadData();
  }


  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadData();
  }

  public dataStateChange(state: State): void {
    this.gridCurrentState = state;
    this.loadData();
  }

  private loadData(): void {
    this.apiService.getData().subscribe((data: {}) => {
      this.puestos = data;
      this.gridView = process(this.puestos, this.gridCurrentState)
    });
  }
}
