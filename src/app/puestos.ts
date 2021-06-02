export class Puesto {
    constructor(
        public id: number,
        public puestoId: number,
        public puestoIdOficial: string,
        public tipoVinculo: string,
        public puestoTipo: string,
        public catalogo: string,
        public adscripcion: string,
        public grupo1Id: string,
        public grupo2Id: string,
        public escala: string,
        public disponibilidadPlena: boolean,
        public fechaVigenciaInicio: Date,
    ) { }
}