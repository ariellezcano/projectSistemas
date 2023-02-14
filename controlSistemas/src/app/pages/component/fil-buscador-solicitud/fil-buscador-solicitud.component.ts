import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SolicitudSistemas } from 'src/app/models/index.models';
import { SolicitudSistemaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-buscador-solicitud',
  templateUrl: './fil-buscador-solicitud.component.html',
  styleUrls: ['./fil-buscador-solicitud.component.scss']
})
export class FilBuscadorSolicitudComponent implements OnInit {

  @Output() emmit: EventEmitter<SolicitudSistemas> = new EventEmitter();

  busqueda: any;

  item: SolicitudSistemas;
  items: SolicitudSistemas[];
  constructor(private wsdl: SolicitudSistemaService) {
    this.busqueda = '';
    this.item = new SolicitudSistemas();
    this.items = []
   }

  ngOnInit(): void {
  }

  async filtrar() {
    this.items = [];
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdl.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = result.data;
        } else if (result.code == 204) {
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>'
          })
        }
      }
    } catch (error) {}
  }

  capturar(event: SolicitudSistemas) {
    if (event != undefined) {
      this.busqueda = event.nroExpte +" - "+ event.nombreUnidad;
      this.emmit.emit(event)
    }
  }

}
