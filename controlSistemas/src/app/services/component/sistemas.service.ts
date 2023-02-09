import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SistemasService {

  other_header: any;
  api: any;
  
  constructor(private http: HttpClient) {   
    this.api = environment.URL + "Sistemas";
  }

  getFindId(id:any){
    this.other_header = this.other_header;
    return this.http
      .get(this.api +"/"+ id, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  getList(page: any, cantidad: any) {
    this.other_header = this.other_header;
    return this.http
      .get(this.api +"/paginate/"+ page+","+cantidad)
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doInsert(evento: object){
    this.other_header = this.other_header;
    return this.http
      .post(this.api, evento, 
      { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        console.log("ERROR",err);
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doUpdate(id: any, evento: any) {
    this.other_header = this.other_header;

    return this.http
      .put(this.api +'/'+ id, evento, 
      { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        console.log(err);
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }


  doDelete(id: number) {
    this.other_header = this.other_header;
    return this.http
      .delete(this.api +'/'+ id, 
      { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doFilter(criterio: any){
    this.other_header = this.other_header;
    const ruta = this.api+'/'+'filterSistemas/';
    return this.http
      .get(ruta + criterio)
      .toPromise()
      .catch((err) => {
        return { 
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }
}
