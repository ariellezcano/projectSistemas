import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Servidores } from 'src/app/models/index.models';
import { ServidoresService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-servidor',
  templateUrl: './combo-servidor.component.html',
  styleUrls: ['./combo-servidor.component.scss']
})
export class ComboServidorComponent implements OnInit {

  @Input()
  set dibujar(item: Servidores) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Servidores> = new EventEmitter<Servidores>();


  item: Servidores;
  items: Servidores[];


  constructor(private wsdl: ServidoresService) {
    this.item = new Servidores();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: Servidores) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Servidores, c2: Servidores): boolean {
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
