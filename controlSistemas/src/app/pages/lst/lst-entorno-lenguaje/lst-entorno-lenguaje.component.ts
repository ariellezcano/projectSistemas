import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EntornoLenguaje } from 'src/app/models/index.models';
import { EntornoLenguajeService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilEntornoComponent } from '../../filters/fil-entorno/fil-entorno.component';

@Component({
  selector: 'app-lst-entorno-lenguaje',
  templateUrl: './lst-entorno-lenguaje.component.html',
  styleUrls: ['./lst-entorno-lenguaje.component.scss']
})
export class LstEntornoLenguajeComponent implements OnInit {

  @ViewChild(FilEntornoComponent, { static: false }) fil!: FilEntornoComponent;

  items: EntornoLenguaje[];
  item: EntornoLenguaje;

  constructor(private wsdl: EntornoLenguajeService, private router: Router) {
    this.items = [];
    this.item = new EntornoLenguaje();
  }

  ngOnInit(): void {
  }


  doFound(event: EntornoLenguaje[]) {
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
    this.router.navigateByUrl('lst-entorno/abm/' + id);
  }

  back() {
    this.router.navigate(['']);
  }

}
