import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoFesta } from '../tipo-festa.model';
import { TipoFestaService } from '../service/tipo-festa.service';

const tipoFestaResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoFesta> => {
  const id = route.params.id;
  if (id) {
    return inject(TipoFestaService)
      .find(id)
      .pipe(
        mergeMap((tipoFesta: HttpResponse<ITipoFesta>) => {
          if (tipoFesta.body) {
            return of(tipoFesta.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default tipoFestaResolve;
