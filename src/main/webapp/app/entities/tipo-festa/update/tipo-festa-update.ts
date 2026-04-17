import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { TipoFestaService } from '../service/tipo-festa.service';
import { ITipoFesta } from '../tipo-festa.model';

import { TipoFestaFormGroup, TipoFestaFormService } from './tipo-festa-form.service';

@Component({
  selector: 'jhi-tipo-festa-update',
  templateUrl: './tipo-festa-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TipoFestaUpdate implements OnInit {
  readonly isSaving = signal(false);
  tipoFesta: ITipoFesta | null = null;

  protected tipoFestaService = inject(TipoFestaService);
  protected tipoFestaFormService = inject(TipoFestaFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TipoFestaFormGroup = this.tipoFestaFormService.createTipoFestaFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoFesta }) => {
      this.tipoFesta = tipoFesta;
      if (tipoFesta) {
        this.updateForm(tipoFesta);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const tipoFesta = this.tipoFestaFormService.getTipoFesta(this.editForm);
    if (tipoFesta.id === null) {
      this.subscribeToSaveResponse(this.tipoFestaService.create(tipoFesta));
    } else {
      this.subscribeToSaveResponse(this.tipoFestaService.update(tipoFesta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITipoFesta | null>): void {
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
    this.isSaving.set(false);
  }

  protected updateForm(tipoFesta: ITipoFesta): void {
    this.tipoFesta = tipoFesta;
    this.tipoFestaFormService.resetForm(this.editForm, tipoFesta);
  }
}
