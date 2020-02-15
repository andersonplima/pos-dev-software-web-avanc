import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemPedido } from 'app/shared/model/item-pedido.model';

@Component({
  selector: 'jhi-item-pedido-detail',
  templateUrl: './item-pedido-detail.component.html'
})
export class ItemPedidoDetailComponent implements OnInit {
  itemPedido: IItemPedido | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemPedido }) => (this.itemPedido = itemPedido));
  }

  previousState(): void {
    window.history.back();
  }
}
