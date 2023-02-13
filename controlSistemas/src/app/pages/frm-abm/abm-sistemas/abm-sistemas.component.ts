import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Unidad } from 'src/app/models/component/unidad';
import {
  DetalleSistemas,
  Estados,
  Servidores,
  Sistemas,
} from 'src/app/models/index.models';
import {
  DetalleSistemasService,
  SistemasService,
  UnidadService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-sistemas',
  templateUrl: './abm-sistemas.component.html',
  styleUrls: ['./abm-sistemas.component.scss'],
})
export class AbmSistemasComponent implements OnInit {
  public id!: number;
  public idSistema!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item: Sistemas;
  dtItem: DetalleSistemas;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: SistemasService,
    private wsdlDetalleSistema: DetalleSistemasService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Sistemas();
    this.dtItem = new DetalleSistemas();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaPresentacion: ['', Validators.required],
      gestorBd: ['', Validators.required],
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];
    this.findId();
    this.findIdDetalleSistema();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findId() {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(this.id).then();
        const result = JSON.parse(JSON.stringify(data));
        // console.log('find', result);
        if (result.code == 200) {
          this.item = result.dato;
          if (this.item.fechaPresentacion != undefined) {
            this.item.fechaPresentacion = moment(
              this.item.fechaPresentacion
            ).format('YYYY-MM-DD');
          }
        }
      } catch (error) {}
    }
  }

  async findIdDetalleSistema() {
    if (this.id > 0) {
      try {
        let data = await this.wsdlDetalleSistema.getFindId(this.id).then();
        const result = JSON.parse(JSON.stringify(data));
        //console.log('find', result);
        if (result.code == 200) {
          this.dtItem = result.dato;
         // console.log("find if", this.dtItem)
        }else{
         // console.log("no hay datos", this.dtItem)
        }
      } catch (error) {}
    }
  }

  doAction() {
    this.enviado = true;
    if (this.form.valid) {
      if (this.id > 0) {
        this.actualizarDatos(this.item);
        //this.actualizarDatosDetalle(this.dtItem);
      } else {
        this.guardar();
      }
    }
  }

  async actualizarDatos(obj: Sistemas) {
    //console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        if(this.dtItem.id == undefined){
          this.idSistema = this.id;
          this.guardarDtSistema();
        }
        if (this.dtItem.id > 0) {
          this.actualizarDatosDetalle(this.dtItem);
        } else {
          this.back();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Dato actualizado correctamente!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else if (result.code == 204) {
      }
    } catch (error) {}
  }

  async actualizarDatosDetalle(objDt: DetalleSistemas) {
    //console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdlDetalleSistema.doUpdate(this.id, objDt).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.back();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
      }
    } catch (error) {}
  }

  async guardar() {
    //console.log('items', this.item);
    try {
      let data = await this.wsdl
        .doInsert(this.item)
        .then
        /*data => {
          console.log("data de data", data)
        }*/
        ();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.idSistema = result.dato.id;
        if (
          this.dtItem.srvWeb > 0 &&
          this.dtItem.srvApi > 0 &&
          this.dtItem.gestorBd != undefined
        ) {
          this.guardarDtSistema();
        } else {
          this.back();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Dato guardado correctamente!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else if (result.code == 204) {
        Swal.fire({
          icon: 'info',
          title: 'Alerta...',
          text: 'El dato ya existe en la base de datos',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Alerta...',
        text: 'No se pudo insertar los datos',
      });
    }
  }

  async guardarDtSistema() {
    //console.log('dt', this.dtItem);
    this.dtItem.sistema = this.idSistema;
    try {
      let data = await this.wsdlDetalleSistema
        .doInsert(this.dtItem)
        .then
        /*data => {
          console.log("data de data", data)
        }*/
        ();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.back();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato guardado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
        Swal.fire({
          icon: 'info',
          title: 'Alerta...',
          text: 'El dato ya existe en la base de datos',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Alerta...',
        text: 'No se pudo insertar los datos',
      });
    }
  }

  //captura dato del autocompletado
  unidad(event: Unidad) {
    this.item.unidad = event.id;
    this.item.nombreUnidad = event.nombre;
  }

  //captura estado
  seleccionEstado(event: Estados) {
    if (event != undefined) {
      this.item.estado = event.id;
    }
  }

  //captura provincia
  seleccionServidorApi(event: Servidores) {
    if (event != undefined) {
      this.dtItem.srvApi = event.id;
    }
  }

  //captura provincia
  seleccionServidorWeb(event: Servidores) {
    if (event != undefined) {
      this.dtItem.srvWeb = event.id;
    }
  }

  back() {
    this.router.navigate(['/lst-sistemas']);
  }
}
