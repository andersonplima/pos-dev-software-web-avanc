import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoFesta, TipoFesta } from 'app/shared/model/tipo-festa.model';
import { TipoFestaService } from './tipo-festa.service';
import { TipoFestaComponent } from './tipo-festa.component';
import { TipoFestaDetailComponent } from './tipo-festa-detail.component';
import { TipoFestaUpdateComponent } from './tipo-festa-update.component';

@Injectable({ providedIn: 'root' })
export class TipoFestaResolve implements Resolve<ITipoFesta> {
  constructor(private service: TipoFestaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoFesta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoFesta: HttpResponse<TipoFesta>) => {
          if (tipoFesta.body) {
            return of(tipoFesta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoFesta());
  }
}

export const tipoFestaRoute: Routes = [
  {
    path: '',
    component: TipoFestaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.tipoFesta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoFestaDetailComponent,
    resolve: {
      tipoFesta: TipoFestaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.tipoFesta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoFestaUpdateComponent,
    resolve: {
      tipoFesta: TipoFestaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.tipoFesta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoFestaUpdateComponent,
    resolve: {
      tipoFesta: TipoFestaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.tipoFesta.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
