import { Component, OnInit } from '@angular/core';
import { SortDescriptor, orderBy, State, DataResult, process, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { GridComponent, DataStateChangeEvent, GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './_services/api.service';
import { ThisReceiver } from '@angular/compiler';

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
  public filter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: []
  }

  public sort: SortDescriptor[] = [
    {
      field: "puestoId",
      dir: "asc",
    },
  ];

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

  public dataStateChange(state: DataStateChangeEvent): void {
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
