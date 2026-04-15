import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPedido } from '../pedido.model';
import { PedidoService } from '../service/pedido.service';

@Injectable({ providedIn: 'root' })
export class PedidoRoutingResolveService implements Resolve<IPedido | null> {
  constructor(protected service: PedidoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPedido | null | never> {
    const id = route.params.id;
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pedido: HttpResponse<IPedido>) => {
          if (pedido.body) {
            return of(pedido.body);
          }
          this.router.navigate(['404']);
          return EMPTY;
        })
      );
    }
    return of(null);
  }
}
