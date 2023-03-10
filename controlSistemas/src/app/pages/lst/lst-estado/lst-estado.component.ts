import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Estados } from 'src/app/models/index.models';
import { EstadosService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilEstadosComponent } from '../../filters/fil-estados/fil-estados.component';

@Component({
  selector: 'app-lst-estado',
  templateUrl: './lst-estado.component.html',
  styleUrls: ['./lst-estado.component.scss']
})
export class LstEstadoComponent implements OnInit {
  @ViewChild(FilEstadosComponent, { static: false }) fil!: FilEstadosComponent;

  items: Estados[];
  item: Estados;

  constructor(private wsdl: EstadosService, private router: Router) {
    this.items = [];
    this.item = new Estados();
  }

  ngOnInit(): void {
  }


  doFound(event: Estados[]) {
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
    this.router.navigateByUrl('lst-estados/abm/' + id);
  }

  back() {
    this.router.navigate(['']);
  }
}
