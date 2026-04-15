import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TipoFestaFormService, TipoFestaFormGroup } from './tipo-festa-form.service';
import { ITipoFesta } from '../tipo-festa.model';
import { TipoFestaService } from '../service/tipo-festa.service';

@Component({
  selector: 'jhi-tipo-festa-update',
  templateUrl: './tipo-festa-update.component.html',
})
export class TipoFestaUpdateComponent implements OnInit {
  isSaving = false;
  tipoFesta: ITipoFesta | null = null;

  editForm: TipoFestaFormGroup = this.tipoFestaFormService.createTipoFestaFormGroup();

  constructor(
    protected tipoFestaService: TipoFestaService,
    protected tipoFestaFormService: TipoFestaFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoFesta }) => {
      this.tipoFesta = tipoFesta;
      if (tipoFesta) {
        this.updateForm(tipoFesta);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoFesta = this.tipoFestaFormService.getTipoFesta(this.editForm);
    if (tipoFesta.id !== null) {
      this.subscribeToSaveResponse(this.tipoFestaService.update(tipoFesta));
    } else {
      this.subscribeToSaveResponse(this.tipoFestaService.create(tipoFesta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoFesta>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(tipoFesta: ITipoFesta): void {
    this.tipoFesta = tipoFesta;
    this.tipoFestaFormService.resetForm(this.editForm, tipoFesta);
  }
}
