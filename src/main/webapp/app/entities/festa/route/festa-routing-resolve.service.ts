import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

const festaResolve = (route: ActivatedRouteSnapshot): Observable<null | IFesta> => {
  const id = route.params.id;
  if (id) {
    return inject(FestaService)
      .find(id)
      .pipe(
        mergeMap((festa: HttpResponse<IFesta>) => {
          if (festa.body) {
            return of(festa.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default festaResolve;
