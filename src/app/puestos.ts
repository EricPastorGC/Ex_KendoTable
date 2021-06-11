import { Adscripcion } from './adscripcion';
import { Catalogo } from './catalogo';
import { Escala } from './escala';
import { PuestoTipo } from './puestoTipo';
import { TipoVinculo } from './tipoVinculo';

export class Puesto {
    constructor(
        public id: number,
        public puestoId: number,
        public puestoIdOficial: string,
        public tipoVinculo: TipoVinculo,
        public puestoTipo: PuestoTipo,
        public catalogo: Catalogo,
        public adscripcion: Adscripcion,
        public grupo1Id: string,
        public grupo2Id: string,
        public escala: Escala,
        public disponibilidadPlena: boolean,
        public fechaVigenciaInicio: Date,
    ) { }
}