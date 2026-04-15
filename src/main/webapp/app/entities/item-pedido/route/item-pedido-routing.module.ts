import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ItemPedidoComponent } from '../list/item-pedido.component';
import { ItemPedidoDetailComponent } from '../detail/item-pedido-detail.component';
import { ItemPedidoUpdateComponent } from '../update/item-pedido-update.component';
import { ItemPedidoRoutingResolveService } from './item-pedido-routing-resolve.service';

const itemPedidoRoute: Routes = [
  {
    path: '',
    component: ItemPedidoComponent,
    data: {
      defaultSort: `id,${  ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemPedidoDetailComponent,
    resolve: {
      itemPedido: ItemPedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemPedidoUpdateComponent,
    resolve: {
      itemPedido: ItemPedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemPedidoUpdateComponent,
    resolve: {
      itemPedido: ItemPedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(itemPedidoRoute)],
  exports: [RouterModule],
})
export class ItemPedidoRoutingModule {}
