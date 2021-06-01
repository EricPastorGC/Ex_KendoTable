export class Puesto {
    constructor(
        public puestoId: string,
        public puestoIdOficial: string,
        public tipoVinculoNombre: string,
        public puestoTipoNombre: string,
        public catalogoNombre: string,
        public adscripcionNombre: string,
        public grupo1Id: string,
        public grupo2Id: string,
        public escala: string,
        public disponibilidadPlena: boolean,
        public fechaVigenciaInicio: Date,
    ) { }
}