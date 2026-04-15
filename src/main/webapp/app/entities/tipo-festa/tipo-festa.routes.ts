import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TipoFestaResolve from './route/tipo-festa-routing-resolve.service';

const tipoFestaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tipo-festa.component').then(m => m.TipoFestaComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tipo-festa-detail.component').then(m => m.TipoFestaDetailComponent),
    resolve: {
      tipoFesta: TipoFestaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tipo-festa-update.component').then(m => m.TipoFestaUpdateComponent),
    resolve: {
      tipoFesta: TipoFestaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tipo-festa-update.component').then(m => m.TipoFestaUpdateComponent),
    resolve: {
      tipoFesta: TipoFestaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoFestaRoute;
