import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TipoServidor } from 'src/app/models/index.models';
import { TipoServidorService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilTipoServidorComponent } from '../../filters/fil-tipo-servidor/fil-tipo-servidor.component';

@Component({
  selector: 'app-lst-tipo-servidor',
  templateUrl: './lst-tipo-servidor.component.html',
  styleUrls: ['./lst-tipo-servidor.component.scss']
})
export class LstTipoServidorComponent implements OnInit {

  @ViewChild(FilTipoServidorComponent, { static: false }) fil!: FilTipoServidorComponent;

  items: TipoServidor[];
  item: TipoServidor;

  constructor(private wsdl: TipoServidorService, private router: Router) {
    this.items = [];
    this.item = new TipoServidor();
  }

  ngOnInit(): void {
  }


  doFound(event: TipoServidor[]) {
    this.items = event;
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
    this.router.navigateByUrl('lst-tipoServidor/abm/' + id);
  }

  back() {
    this.router.navigate(['']);
  }
}
