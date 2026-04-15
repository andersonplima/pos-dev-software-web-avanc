import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PedidoFormService, PedidoFormGroup } from './pedido-form.service';
import { IPedido } from '../pedido.model';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'jhi-pedido-update',
  templateUrl: './pedido-update.component.html',
})
export class PedidoUpdateComponent implements OnInit {
  isSaving = false;
  pedido: IPedido | null = null;

  editForm: PedidoFormGroup = this.pedidoFormService.createPedidoFormGroup();

  constructor(
    protected pedidoService: PedidoService,
    protected pedidoFormService: PedidoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.pedido = pedido;
      if (pedido) {
        this.updateForm(pedido);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pedido = this.pedidoFormService.getPedido(this.editForm);
    if (pedido.id !== null) {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedido>>): void {
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

  protected updateForm(pedido: IPedido): void {
    this.pedido = pedido;
    this.pedidoFormService.resetForm(this.editForm, pedido);
  }
}
