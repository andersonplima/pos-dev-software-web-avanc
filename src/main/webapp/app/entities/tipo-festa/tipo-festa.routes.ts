import { Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import TipoFestaResolve from './route/tipo-festa-routing-resolve.service';

const tipoFestaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tipo-festa').then(m => m.TipoFesta),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tipo-festa-detail').then(m => m.TipoFestaDetail),
    resolve: {
      tipoFesta: TipoFestaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tipo-festa-update').then(m => m.TipoFestaUpdate),
    resolve: {
      tipoFesta: TipoFestaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tipo-festa-update').then(m => m.TipoFestaUpdate),
    resolve: {
      tipoFesta: TipoFestaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoFestaRoute;
