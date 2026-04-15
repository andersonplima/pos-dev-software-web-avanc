import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ItemPedidoComponent } from './list/item-pedido.component';
import { ItemPedidoDetailComponent } from './detail/item-pedido-detail.component';
import { ItemPedidoUpdateComponent } from './update/item-pedido-update.component';
import { ItemPedidoDeleteDialogComponent } from './delete/item-pedido-delete-dialog.component';
import { ItemPedidoRoutingModule } from './route/item-pedido-routing.module';

@NgModule({
  imports: [SharedModule, ItemPedidoRoutingModule],
  declarations: [ItemPedidoComponent, ItemPedidoDetailComponent, ItemPedidoUpdateComponent, ItemPedidoDeleteDialogComponent],
})
export class ItemPedidoModule {}
