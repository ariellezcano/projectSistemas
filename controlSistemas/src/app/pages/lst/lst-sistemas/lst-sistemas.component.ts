import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleSistemas, Sistemas } from 'src/app/models/index.models';
import {
  DetalleSistemasService,
  SistemasService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilSistemasComponent } from '../../filters/fil-sistemas/fil-sistemas.component';

@Component({
  selector: 'app-lst-sistemas',
  templateUrl: './lst-sistemas.component.html',
  styleUrls: ['./lst-sistemas.component.scss'],
})
export class LstSistemasComponent implements OnInit {
  @ViewChild(FilSistemasComponent, { static: false })
  fil!: FilSistemasComponent;

  items: Sistemas[];
  item: Sistemas;
  dtSistema: DetalleSistemas;

  constructor(
    private wsdl: SistemasService,
    private wsdlDetalle: DetalleSistemasService,
    private router: Router
  ) {
    this.items = [];
    this.item = new Sistemas();
    this.dtSistema = new DetalleSistemas();
  }

  ngOnInit(): void {}

  doFound(event: Sistemas[]) {
    console.log(event);
    this.items = event;
  }

  async sistema(id: number){
    try {
      let data = await this.wsdl.getFindId(id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == '200'){
        this.item = result.dato;
        this.detalleSistema(id);
      }  
    } catch (error) {
      Swal.fire("Error al capturar los datos")
    }
  }

  async detalleSistema(id: number){
    try {
      let data = await this.wsdlDetalle.getFindId(id).then();
      const result = JSON.parse(JSON.stringify(data));
      if(result.code == '200'){
        this.dtSistema = result.dato;
      }
    } catch (error) {
      Swal.fire("Error al capturar los datos")
    }
  }

  async eliminar(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estás seguro?',
        text: 'El registro no se podra recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          let data = await this.wsdl.doDelete(id).then();
          const result = JSON.parse(JSON.stringify(data));
          if (result.code == 200) {
            this.fil.filter();
            swalWithBootstrapButtons.fire(
              'Eliminado exitosamente!',
              'Tu registro ya no existe.',
              'success'
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su registro está seguro :)',
            'error'
          );
        }
      });
  }

  valor(item: any) {
    item = item;
    let valor = '';
    if (item) {
      valor = 'Activo';
    } else {
      valor = 'Inactivo';
    }
    return valor;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-sistemas/abm/' + id);
  }

  back() {
    this.router.navigate(['']);
  }
}
