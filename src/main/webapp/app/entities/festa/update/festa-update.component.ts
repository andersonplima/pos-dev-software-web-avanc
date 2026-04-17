import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoFesta } from 'app/entities/tipo-festa/tipo-festa.model';
import { TipoFestaService } from 'app/entities/tipo-festa/service/tipo-festa.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { FestaService } from '../service/festa.service';
import { IFesta } from '../festa.model';
import { FestaFormGroup, FestaFormService } from './festa-form.service';

@Component({
  selector: 'jhi-festa-update',
  templateUrl: './festa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FestaUpdateComponent implements OnInit {
  isSaving = false;
  festa: IFesta | null = null;

  tipoFestasSharedCollection: ITipoFesta[] = [];
  clientesSharedCollection: ICliente[] = [];

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
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const festa = this.festaFormService.getFesta(this.editForm);
    if (festa.id !== null) {
      this.subscribeToSaveResponse(this.festaService.update(festa));
    } else {
      this.subscribeToSaveResponse(this.festaService.create(festa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFesta>>): void {
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

  protected updateForm(festa: IFesta): void {
    this.festa = festa;
    this.festaFormService.resetForm(this.editForm, festa);

    this.tipoFestasSharedCollection = this.tipoFestaService.addTipoFestaToCollectionIfMissing<ITipoFesta>(
      this.tipoFestasSharedCollection,
      festa.tipoFesta,
    );
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing<ICliente>(
      this.clientesSharedCollection,
      festa.cliente,
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
      .subscribe((tipoFestas: ITipoFesta[]) => (this.tipoFestasSharedCollection = tipoFestas));

    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing<ICliente>(clientes, this.festa?.cliente)))
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));
  }
}
