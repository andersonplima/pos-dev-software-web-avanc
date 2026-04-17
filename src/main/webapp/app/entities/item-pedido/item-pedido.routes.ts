import { Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ItemPedidoResolve from './route/item-pedido-routing-resolve.service';

const itemPedidoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/item-pedido').then(m => m.ItemPedido),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/item-pedido-detail').then(m => m.ItemPedidoDetail),
    resolve: {
      itemPedido: ItemPedidoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/item-pedido-update').then(m => m.ItemPedidoUpdate),
    resolve: {
      itemPedido: ItemPedidoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/item-pedido-update').then(m => m.ItemPedidoUpdate),
    resolve: {
      itemPedido: ItemPedidoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itemPedidoRoute;
