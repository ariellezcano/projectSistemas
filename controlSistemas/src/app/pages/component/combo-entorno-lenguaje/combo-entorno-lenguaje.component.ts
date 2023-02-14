import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntornoLenguaje } from 'src/app/models/index.models';
import { EntornoLenguajeService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-entorno-lenguaje',
  templateUrl: './combo-entorno-lenguaje.component.html',
  styleUrls: ['./combo-entorno-lenguaje.component.scss']
})
export class ComboEntornoLenguajeComponent implements OnInit {

  @Input()
  set dibujar(item: EntornoLenguaje) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<EntornoLenguaje> = new EventEmitter<EntornoLenguaje>();


  item: EntornoLenguaje;
  items: EntornoLenguaje[];


  constructor(private wsdl: EntornoLenguajeService) {
    this.item = new EntornoLenguaje();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: EntornoLenguaje) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: EntornoLenguaje, c2: EntornoLenguaje): boolean {
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
