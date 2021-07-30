import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { identifierModuleUrl } from '@angular/compiler';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  
  constructor(private httpClient : HttpClient,
              private configService : ConfigParamsService){}   

  salvar(filme:Filme) : Observable<Filme>{
      return this.httpClient.post<Filme>(url, filme);       
  }

  editar(filme:Filme) : Observable<Filme>{
    return this.httpClient.put<Filme>(url + filme.id,filme);

  }

  listar(config: ConfigPrams) : Observable<Filme[]>{
    const configPrams =  this.configService.configurarParametros(config);
    return this.httpClient.get<Filme[]>(url,{params: configPrams} );
  } 
  visualizar(id:number) : Observable<Filme>{
    return this.httpClient.get<Filme>(url + id);
  }
  excluir(id: number) : Observable<void> {
    return this.httpClient.delete<void>(url+id);
  }
}
