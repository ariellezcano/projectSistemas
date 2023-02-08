export class DetalleSistemas {
    id!: number;
    sistema!: number;
    srvWeb!: number;
    srvApi!: number;
    gestorBd!: string;
    activo!: boolean;

    sistemaNavigation: any;
    srvWebNavigation: any;
    srvApiNavigation: any;
}
