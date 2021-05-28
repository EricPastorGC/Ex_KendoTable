import { Component, OnInit } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
//import * as data from './puestos.json';
import { Observable } from 'rxjs';
import { ApiService } from './_services/api.service';


const dataState = {
  sort: [{ field: "puestoId", dir: "asc" }],
  take: 10,
  skip: 0
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  puestos: any = [];

  public multiple = false;

  state = {
    dataState: dataState
  };


  //public gridData: any[] = (data as any).default;

  //public view: Observable<GridDataResult>;

  public pageSize = 10;
  public skip = 0;
  public take = 0;


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

  protected pageChange({ skip, take }: PageChangeEvent): void {
    //this.skip = event.skip;
    this.pageSize = take;
    this.loadData();
  }

  private loadData() {
    return this.apiService.getData().subscribe((data: {}) => {
      this.puestos = data;
    })
  }
}
