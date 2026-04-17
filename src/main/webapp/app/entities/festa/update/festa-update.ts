import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { TipoFestaService } from 'app/entities/tipo-festa/service/tipo-festa.service';
import { ITipoFesta } from 'app/entities/tipo-festa/tipo-festa.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

import { FestaFormGroup, FestaFormService } from './festa-form.service';

@Component({
  selector: 'jhi-festa-update',
  templateUrl: './festa-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class FestaUpdate implements OnInit {
  readonly isSaving = signal(false);
  festa: IFesta | null = null;

  tipoFestasSharedCollection = signal<ITipoFesta[]>([]);
  clientesSharedCollection = signal<ICliente[]>([]);

  protected festaService = inject(FestaService);
  protected festaFormService = inject(FestaFormService);
  protected tipoFestaService = inject(TipoFestaService);
  protected clienteService = inject(ClienteService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FestaFormGroup = this.festaFormService.createFestaFormGroup();

  compareTipoFesta = (o1: ITipoFesta | null, o2: ITipoFesta | null): boolean => this.tipoFestaService.compareTipoFesta(o1, o2);

  compareCliente = (o1: ICliente | null, o2: ICliente | null): boolean => this.clienteService.compareCliente(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ festa }) => {
      this.festa = festa;
      if (festa) {
        this.updateForm(festa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const festa = this.festaFormService.getFesta(this.editForm);
    if (festa.id === null) {
      this.subscribeToSaveResponse(this.festaService.create(festa));
    } else {
      this.subscribeToSaveResponse(this.festaService.update(festa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IFesta | null>): void {
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

  protected updateForm(festa: IFesta): void {
    this.festa = festa;
    this.festaFormService.resetForm(this.editForm, festa);

    this.tipoFestasSharedCollection.update(tipoFestas =>
      this.tipoFestaService.addTipoFestaToCollectionIfMissing<ITipoFesta>(tipoFestas, festa.tipoFesta),
    );
    this.clientesSharedCollection.update(clientes =>
      this.clienteService.addClienteToCollectionIfMissing<ICliente>(clientes, festa.cliente),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoFestaService
      .query()
      .pipe(map((res: HttpResponse<ITipoFesta[]>) => res.body ?? []))
      .pipe(
        map((tipoFestas: ITipoFesta[]) =>
          this.tipoFestaService.addTipoFestaToCollectionIfMissing<ITipoFesta>(tipoFestas, this.festa?.tipoFesta),
        ),
      )
      .subscribe((tipoFestas: ITipoFesta[]) => this.tipoFestasSharedCollection.set(tipoFestas));

    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing<ICliente>(clientes, this.festa?.cliente)))
      .subscribe((clientes: ICliente[]) => this.clientesSharedCollection.set(clientes));
  }
}
