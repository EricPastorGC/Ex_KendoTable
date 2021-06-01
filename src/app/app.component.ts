import { Component, OnInit, ViewChild } from '@angular/core';
import { SortDescriptor, orderBy, State, DataResult, process, CompositeFilterDescriptor, GroupDescriptor } from '@progress/kendo-data-query';
import { GridComponent, DataStateChangeEvent, GridDataResult, PageChangeEvent, DataBindingDirective } from "@progress/kendo-angular-grid";
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './_services/api.service';
import { Puesto } from './puestos';
import { map } from 'rxjs/operators';

const gridInitialState: State = {
  skip: 0,
  take: 10,
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

  //public puestos: any;

  private puestos: Puesto[];

  public group: GroupDescriptor[] = [];
  public multiple = false;
  public pageSize = 10;
  public skip = 0;
  public take = 0;
  public search = false;
  public value = '';
  public groupable = false;

  private subscriptions$: Subscription = new Subscription();


  public sort: SortDescriptor[] = [
    {
      field: "puestoId",
      dir: "asc",
    },
  ];

  public gridView: GridDataResult;

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

  public groupChange(groups: GroupDescriptor[]): void {
    this.group = groups;
    this.loadData();
  }

  private loadData(): void {
    this.apiService.getData().subscribe((data: Puesto[]) => {
      this.puestos = data;
      this.gridView = process(this.puestos, this.gridCurrentState);
    });
  }

  public showGroupable(): void {
    this.groupable = !this.groupable;
    this.loadData();
  }

  public showSearch(): void {
    this.search = !this.search;
    this.loadData();
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.puestos, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "puestoId",
            operator: "contains",
            value: inputValue,
          },
          /*{
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },*/
        ],
      },
    });


  }
}
