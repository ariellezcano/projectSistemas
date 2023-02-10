import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estados } from 'src/app/models/index.models';
import { EstadosService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-estados',
  templateUrl: './combo-estados.component.html',
  styleUrls: ['./combo-estados.component.scss']
})
export class ComboEstadosComponent implements OnInit {

  @Input()
  set dibujar(item: Estados) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Estados> = new EventEmitter<Estados>();


  item: Estados;
  items: Estados[];


  constructor(private wsdl: EstadosService) {
    this.item = new Estados();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: Estados) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Estados, c2: Estados): boolean {
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
