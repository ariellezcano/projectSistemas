export class DetalleSistemas {
    id!: number;
    sistema!: number;
    srvWeb!: number;
    srvApi!: number;
    gestorBd!: string;
    frameworkLenguaje!: number;
    activo?: boolean;

    sistemaNavigation: any;
    srvWebNavigation: any;
    srvApiNavigation: any;
    entornoNavigation: any;
}
