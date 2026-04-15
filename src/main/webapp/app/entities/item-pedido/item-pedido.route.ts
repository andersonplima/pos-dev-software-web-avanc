import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IItemPedido, ItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';
import { ItemPedidoComponent } from './item-pedido.component';
import { ItemPedidoDetailComponent } from './item-pedido-detail.component';
import { ItemPedidoUpdateComponent } from './item-pedido-update.component';

@Injectable({ providedIn: 'root' })
export class ItemPedidoResolve implements Resolve<IItemPedido> {
  constructor(private service: ItemPedidoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemPedido> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((itemPedido: HttpResponse<ItemPedido>) => {
          if (itemPedido.body) {
            return of(itemPedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ItemPedido());
  }
}

export const itemPedidoRoute: Routes = [
  {
    path: '',
    component: ItemPedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemPedidoDetailComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemPedidoUpdateComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemPedidoUpdateComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterapp1App.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
