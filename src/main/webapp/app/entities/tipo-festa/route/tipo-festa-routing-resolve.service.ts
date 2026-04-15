import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoFesta } from '../tipo-festa.model';
import { TipoFestaService } from '../service/tipo-festa.service';

@Injectable({ providedIn: 'root' })
export class TipoFestaRoutingResolveService implements Resolve<ITipoFesta | null> {
  constructor(
    protected service: TipoFestaService,
    protected router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoFesta | null | never> {
    const id = route.params.id;
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoFesta: HttpResponse<ITipoFesta>) => {
          if (tipoFesta.body) {
            return of(tipoFesta.body);
          }
          this.router.navigate(['404']);
          return EMPTY;
        }),
      );
    }
    return of(null);
  }
}
