import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoFesta } from 'app/shared/model/tipo-festa.model';

@Component({
  selector: 'jhi-tipo-festa-detail',
  templateUrl: './tipo-festa-detail.component.html'
})
export class TipoFestaDetailComponent implements OnInit {
  tipoFesta: ITipoFesta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoFesta }) => (this.tipoFesta = tipoFesta));
  }

  previousState(): void {
    window.history.back();
  }
}
