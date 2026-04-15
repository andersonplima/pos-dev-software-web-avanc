import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FestaComponent } from '../list/festa.component';
import { FestaDetailComponent } from '../detail/festa-detail.component';
import { FestaUpdateComponent } from '../update/festa-update.component';
import { FestaRoutingResolveService } from './festa-routing-resolve.service';

const festaRoute: Routes = [
  {
    path: '',
    component: FestaComponent,
    data: {
      defaultSort: `id,${  ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FestaDetailComponent,
    resolve: {
      festa: FestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FestaUpdateComponent,
    resolve: {
      festa: FestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FestaUpdateComponent,
    resolve: {
      festa: FestaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(festaRoute)],
  exports: [RouterModule],
})
export class FestaRoutingModule {}
