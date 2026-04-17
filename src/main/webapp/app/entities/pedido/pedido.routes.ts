import { Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import PedidoResolve from './route/pedido-routing-resolve.service';

const pedidoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/pedido').then(m => m.Pedido),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/pedido-detail').then(m => m.PedidoDetail),
    resolve: {
      pedido: PedidoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/pedido-update').then(m => m.PedidoUpdate),
    resolve: {
      pedido: PedidoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/pedido-update').then(m => m.PedidoUpdate),
    resolve: {
      pedido: PedidoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default pedidoRoute;
