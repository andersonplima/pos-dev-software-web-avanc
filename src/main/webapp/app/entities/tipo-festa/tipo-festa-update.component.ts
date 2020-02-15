import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoFesta, TipoFesta } from 'app/shared/model/tipo-festa.model';
import { TipoFestaService } from './tipo-festa.service';

@Component({
  selector: 'jhi-tipo-festa-update',
  templateUrl: './tipo-festa-update.component.html'
})
export class TipoFestaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(50)]],
    descricao: [null, [Validators.required, Validators.maxLength(100)]]
  });

  constructor(protected tipoFestaService: TipoFestaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoFesta }) => {
      this.updateForm(tipoFesta);
    });
  }

  updateForm(tipoFesta: ITipoFesta): void {
    this.editForm.patchValue({
      id: tipoFesta.id,
      nome: tipoFesta.nome,
      descricao: tipoFesta.descricao
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoFesta = this.createFromForm();
    if (tipoFesta.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoFestaService.update(tipoFesta));
    } else {
      this.subscribeToSaveResponse(this.tipoFestaService.create(tipoFesta));
    }
  }

  private createFromForm(): ITipoFesta {
    return {
      ...new TipoFesta(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoFesta>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
