import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

@Injectable({ providedIn: 'root' })
export class FestaRoutingResolveService implements Resolve<IFesta | null> {
  constructor(
    protected service: FestaService,
    protected router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFesta | null | never> {
    const id = route.params.id;
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((festa: HttpResponse<IFesta>) => {
          if (festa.body) {
            return of(festa.body);
          } 
            this.router.navigate(['404']);
            return EMPTY;
          
        }),
      );
    }
    return of(null);
  }
}
