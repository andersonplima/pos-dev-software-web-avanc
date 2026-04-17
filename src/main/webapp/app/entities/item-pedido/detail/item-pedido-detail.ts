import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IItemPedido } from '../item-pedido.model';

@Component({
  selector: 'jhi-item-pedido-detail',
  templateUrl: './item-pedido-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class ItemPedidoDetail {
  readonly itemPedido = input<IItemPedido | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
