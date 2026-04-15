import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IItemPedido, ItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';

@Component({
  selector: 'jhi-item-pedido-update',
  templateUrl: './item-pedido-update.component.html'
})
export class ItemPedidoUpdateComponent implements OnInit {
  isSaving = false;
  pedidos: IPedido[] = [];

  editForm = this.fb.group({
    id: [],
    nomeItem: [null, [Validators.required]],
    valorItem: [],
    pedidoId: []
  });

  constructor(
    protected itemPedidoService: ItemPedidoService,
    protected pedidoService: PedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemPedido }) => {
      this.updateForm(itemPedido);

      this.pedidoService.query().subscribe((res: HttpResponse<IPedido[]>) => (this.pedidos = res.body || []));
    });
  }

  updateForm(itemPedido: IItemPedido): void {
    this.editForm.patchValue({
      id: itemPedido.id,
      nomeItem: itemPedido.nomeItem,
      valorItem: itemPedido.valorItem,
      pedidoId: itemPedido.pedidoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemPedido = this.createFromForm();
    if (itemPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.itemPedidoService.update(itemPedido));
    } else {
      this.subscribeToSaveResponse(this.itemPedidoService.create(itemPedido));
    }
  }

  private createFromForm(): IItemPedido {
    return {
      ...new ItemPedido(),
      id: this.editForm.get(['id'])!.value,
      nomeItem: this.editForm.get(['nomeItem'])!.value,
      valorItem: this.editForm.get(['valorItem'])!.value,
      pedidoId: this.editForm.get(['pedidoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemPedido>>): void {
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

  trackById(index: number, item: IPedido): any {
    return item.id;
  }
}
