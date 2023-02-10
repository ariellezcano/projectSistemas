import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoServidor } from 'src/app/models/index.models';
import { TipoServidorService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-tipo-servidor',
  templateUrl: './combo-tipo-servidor.component.html',
  styleUrls: ['./combo-tipo-servidor.component.scss']
})
export class ComboTipoServidorComponent implements OnInit {

  @Input()
  set dibujar(item: TipoServidor) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<TipoServidor> = new EventEmitter<TipoServidor>();


  item: TipoServidor;
  items: TipoServidor[];


  constructor(private wsdl: TipoServidorService) {
    this.item = new TipoServidor();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: TipoServidor) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: TipoServidor, c2: TipoServidor): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  async listar() {
    await this.wsdl.getList(1, 20).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.nombre > y.nombre) {
          return 1;
        }
        if (x.nombre < y.nombre) {
          return -1;
        }
        return 0;
      });
    });
  }

}
