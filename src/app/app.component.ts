import { Component, Inject, OnInit } from '@angular/core';
import { SortDescriptor, State, process, GroupDescriptor } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { ApiService } from './_services/api.service';
import { Puesto } from './puestos';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  private puestos: Puesto[];

  public minWidthPc: 450;
  public maxWidthMob: 450

  public multiple = false;
  public pageSize = 10;
  public take = 0;
  public search = false;
  public value = '';
  public groupable = false;

  public gridView: GridDataResult;

  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(public apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData();
  }


  public sortChange(sort: SortDescriptor[]): void {
    this.gridCurrentState.sort = sort;
  }

  public pageChange(event: PageChangeEvent): void {
    this.gridCurrentState.skip = event.skip;
    this.pageSize = event.take;
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridCurrentState = state;
    this.loadData();
  }

  public groupChange(groups: GroupDescriptor[]): void {
    this.gridCurrentState.group = groups;
  }

  private loadData(): void {
    this.apiService.getData().subscribe((data: Puesto[]) => {
      this.puestos = data;
      this.gridView = process(this.puestos, this.gridCurrentState);
    });
  }

  public showGroupable(): void {
    this.groupable = !this.groupable;
  }

  public showSearch(): void {
    this.search = !this.search;
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
          {
            field: "puestoIdOficial",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "tipoVinculo.nombre",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "puestoTipo.nombre",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "catalogo.nombre",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "adscripcion.nombre",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "grupo1Id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "grupo2Id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "escala.nombre",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    });
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      puestoId: new FormControl(),
      puestoIdOficial: new FormControl(),
      tipoVinculoNombre: new FormControl(),
      puestoTipoNombre: new FormControl(),
      catalogoNombre: new FormControl(),
      adscripcionNombre: new FormControl(),
      grupo1Id: new FormControl(),
      grupo2Id: new FormControl(),
      escalaNombre: new FormControl(),
      disponibilidadPlena: new FormControl(),
      fechaVigenciaInicio: new FormControl(),
    });

    sender.addRow(this.formGroup);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const puesto: Puesto = formGroup.value;

    if (isNew) this.apiService.postData(puesto).subscribe();

    sender.closeRow(rowIndex);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public cancelHandler({ sender, rowIndex }) {
    sender.closeRow(rowIndex)
  }
}
