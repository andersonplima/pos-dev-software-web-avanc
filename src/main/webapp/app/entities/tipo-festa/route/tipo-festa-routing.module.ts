import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoFestaComponent } from '../list/tipo-festa.component';
import { TipoFestaDetailComponent } from '../detail/tipo-festa-detail.component';
import { TipoFestaUpdateComponent } from '../update/tipo-festa-update.component';
import { TipoFestaRoutingResolveService } from './tipo-festa-routing-resolve.service';

const tipoFestaRoute: Routes = [
  {
    path: '',
    component: TipoFestaComponent,
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoFestaDetailComponent,
    resolve: {
      tipoFesta: TipoFestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoFestaUpdateComponent,
    resolve: {
      tipoFesta: TipoFestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoFestaUpdateComponent,
    resolve: {
      tipoFesta: TipoFestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoFestaRoute)],
  exports: [RouterModule],
})
export class TipoFestaRoutingModule {}
