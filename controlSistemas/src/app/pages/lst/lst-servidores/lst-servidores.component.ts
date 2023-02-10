import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Servidores } from 'src/app/models/index.models';
import { ServidoresService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilServidoresComponent } from '../../filters/fil-servidores/fil-servidores.component';

@Component({
  selector: 'app-lst-servidores',
  templateUrl: './lst-servidores.component.html',
  styleUrls: ['./lst-servidores.component.scss']
})
export class LstServidoresComponent implements OnInit {

  @ViewChild(FilServidoresComponent, { static: false }) fil!: FilServidoresComponent;

  items: Servidores[];
  item: Servidores;

  constructor(private wsdl: ServidoresService, private router: Router) {
    this.items = [];
    this.item = new Servidores();
  }

  ngOnInit(): void {
  }


  doFound(event: Servidores[]) {
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
    this.router.navigateByUrl('lst-servidores/abm/' + id);
  }

  back() {
    this.router.navigate(['']);
  }
}
