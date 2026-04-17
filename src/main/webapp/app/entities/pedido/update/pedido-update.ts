import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IPedido } from '../pedido.model';
import { PedidoService } from '../service/pedido.service';

import { PedidoFormGroup, PedidoFormService } from './pedido-form.service';

@Component({
  selector: 'jhi-pedido-update',
  templateUrl: './pedido-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class PedidoUpdate implements OnInit {
  readonly isSaving = signal(false);
  pedido: IPedido | null = null;

  protected pedidoService = inject(PedidoService);
  protected pedidoFormService = inject(PedidoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PedidoFormGroup = this.pedidoFormService.createPedidoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.pedido = pedido;
      if (pedido) {
        this.updateForm(pedido);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const pedido = this.pedidoFormService.getPedido(this.editForm);
    if (pedido.id === null) {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IPedido | null>): void {
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

  protected updateForm(pedido: IPedido): void {
    this.pedido = pedido;
    this.pedidoFormService.resetForm(this.editForm, pedido);
  }
}
