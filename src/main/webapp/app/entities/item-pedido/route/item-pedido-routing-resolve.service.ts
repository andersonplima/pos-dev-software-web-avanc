import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItemPedido } from '../item-pedido.model';
import { ItemPedidoService } from '../service/item-pedido.service';

@Injectable({ providedIn: 'root' })
export class ItemPedidoRoutingResolveService implements Resolve<IItemPedido | null> {
  constructor(protected service: ItemPedidoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemPedido | null | never> {
    const id = route.params.id;
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((itemPedido: HttpResponse<IItemPedido>) => {
          if (itemPedido.body) {
            return of(itemPedido.body);
          }
          this.router.navigate(['404']);
          return EMPTY;
        })
      );
    }
    return of(null);
  }
}
