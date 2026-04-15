import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';

@Component({
  templateUrl: './item-pedido-delete-dialog.component.html'
})
export class ItemPedidoDeleteDialogComponent {
  itemPedido?: IItemPedido;

  constructor(
    protected itemPedidoService: ItemPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itemPedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('itemPedidoListModification');
      this.activeModal.close();
    });
  }
}
