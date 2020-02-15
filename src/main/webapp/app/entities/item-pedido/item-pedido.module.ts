import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipsterapp1SharedModule } from 'app/shared/shared.module';
import { ItemPedidoComponent } from './item-pedido.component';
import { ItemPedidoDetailComponent } from './item-pedido-detail.component';
import { ItemPedidoUpdateComponent } from './item-pedido-update.component';
import { ItemPedidoDeleteDialogComponent } from './item-pedido-delete-dialog.component';
import { itemPedidoRoute } from './item-pedido.route';

@NgModule({
  imports: [Jhipsterapp1SharedModule, RouterModule.forChild(itemPedidoRoute)],
  declarations: [ItemPedidoComponent, ItemPedidoDetailComponent, ItemPedidoUpdateComponent, ItemPedidoDeleteDialogComponent],
  entryComponents: [ItemPedidoDeleteDialogComponent]
})
export class Jhipsterapp1ItemPedidoModule {}
