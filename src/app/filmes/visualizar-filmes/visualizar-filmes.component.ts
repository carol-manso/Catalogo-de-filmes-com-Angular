import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  filme:Filme;
  id:number;
  readonly semFoto='https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg'; 
  
  constructor(public dialog: MatDialog,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private filmesService: FilmesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
    
  }
  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  } 


  excluir(): void{
    const config = {
      data : {
        titulo: 'Deseja mesmo excluir esse filme?',
        descricao: 'Caso tenha certeza que quer excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true,
      } as Alerta
    };

    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe( (opcao : boolean) => {
      if(opcao){
        this.filmesService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/filmes'));
      } 
    });
  } 
  reiniciarForm() {
    throw new Error('Method not implemented.');
  }
  private visualizar () : void {
    this.filmesService.visualizar(this.id).subscribe((filme : Filme) => {
      this.filme = filme
    });
  }

}
