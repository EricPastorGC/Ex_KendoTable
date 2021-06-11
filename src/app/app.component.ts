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

const createFormGroup = (dataItem: Puesto) =>
  new FormGroup({
    id: new FormControl(dataItem.id),
    puestoId: new FormControl(dataItem.puestoId),
    puestoIdOficial: new FormControl(dataItem.puestoIdOficial),
    tipoVinculo: new FormGroup({
      nombre: new FormControl(dataItem?.tipoVinculo?.nombre)
    }),
    puestoTipo: new FormGroup({
      nombre: new FormControl(dataItem?.puestoTipo?.nombre)
    }),
    catalogo: new FormGroup({
      nombre: new FormControl(dataItem?.catalogo?.nombre)
    }),
    adscripcion: new FormGroup({
      nombre: new FormControl(dataItem?.adscripcion?.nombre)
    }),
    grupo1Id: new FormControl(dataItem.grupo1Id),
    grupo2Id: new FormControl(dataItem.grupo2Id),
    escala: new FormGroup({
      nombre: new FormControl(dataItem?.escala?.nombre)
    }),
    disponibilidadPlena: new FormControl(dataItem.disponibilidadPlena),
    fechaVigenciaInicio: new FormControl(dataItem.fechaVigenciaInicio),
  });

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
          }
        ]
      },
    });
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
      id: 0,
      puestoId: 0,
      puestoIdOficial: "",
      tipoVinculo: null,
      puestoTipo: null,
      catalogo: null,
      adscripcion: null,
      grupo1Id: "",
      grupo2Id: "",
      escala: null,
      disponibilidadPlena: false,
      fechaVigenciaInicio: new Date(),
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup(dataItem)

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const puesto: Puesto = formGroup.value;

    if (isNew) this.apiService.postData(puesto).subscribe();
    else this.apiService.putData(puesto.id, puesto).subscribe();

    sender.closeRow(rowIndex);

    this.loadData();
  }

  public removeHandler({ dataItem }) {
    this.apiService.removeData(dataItem).subscribe();

    this.loadData();
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
