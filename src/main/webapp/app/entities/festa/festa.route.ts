import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFesta, Festa } from 'app/shared/model/festa.model';
import { FestaService } from './festa.service';
import { FestaComponent } from './festa.component';
import { FestaDetailComponent } from './festa-detail.component';
import { FestaUpdateComponent } from './festa-update.component';

@Injectable({ providedIn: 'root' })
export class FestaResolve implements Resolve<IFesta> {
  constructor(private service: FestaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFesta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((festa: HttpResponse<Festa>) => {
          if (festa.body) {
            return of(festa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Festa());
  }
}

export const festaRoute: Routes = [
  {
    path: '',
    component: FestaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.festa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FestaDetailComponent,
    resolve: {
      festa: FestaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.festa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FestaUpdateComponent,
    resolve: {
      festa: FestaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.festa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FestaUpdateComponent,
    resolve: {
      festa: FestaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.festa.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
