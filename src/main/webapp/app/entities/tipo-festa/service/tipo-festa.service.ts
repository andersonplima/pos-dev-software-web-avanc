import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoFesta, NewTipoFesta } from '../tipo-festa.model';

export type PartialUpdateTipoFesta = Partial<ITipoFesta> & Pick<ITipoFesta, 'id'>;

export type EntityResponseType = HttpResponse<ITipoFesta>;
export type EntityArrayResponseType = HttpResponse<ITipoFesta[]>;

@Injectable({ providedIn: 'root' })
export class TipoFestaService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-festas');

  create(tipoFesta: NewTipoFesta): Observable<EntityResponseType> {
    return this.http.post<ITipoFesta>(this.resourceUrl, tipoFesta, { observe: 'response' });
  }

  update(tipoFesta: ITipoFesta): Observable<EntityResponseType> {
    return this.http.put<ITipoFesta>(`${this.resourceUrl}/${this.getTipoFestaIdentifier(tipoFesta)}`, tipoFesta, { observe: 'response' });
  }

  partialUpdate(tipoFesta: PartialUpdateTipoFesta): Observable<EntityResponseType> {
    return this.http.patch<ITipoFesta>(`${this.resourceUrl}/${this.getTipoFestaIdentifier(tipoFesta)}`, tipoFesta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoFesta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoFesta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoFestaIdentifier(tipoFesta: Pick<ITipoFesta, 'id'>): number {
    return tipoFesta.id;
  }

  compareTipoFesta(o1: Pick<ITipoFesta, 'id'> | null, o2: Pick<ITipoFesta, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoFestaIdentifier(o1) === this.getTipoFestaIdentifier(o2) : o1 === o2;
  }

  addTipoFestaToCollectionIfMissing<Type extends Pick<ITipoFesta, 'id'>>(
    tipoFestaCollection: Type[],
    ...tipoFestasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoFestas: Type[] = tipoFestasToCheck.filter(isPresent);
    if (tipoFestas.length > 0) {
      const tipoFestaCollectionIdentifiers = tipoFestaCollection.map(tipoFestaItem => this.getTipoFestaIdentifier(tipoFestaItem));
      const tipoFestasToAdd = tipoFestas.filter(tipoFestaItem => {
        const tipoFestaIdentifier = this.getTipoFestaIdentifier(tipoFestaItem);
        if (tipoFestaCollectionIdentifiers.includes(tipoFestaIdentifier)) {
          return false;
        }
        tipoFestaCollectionIdentifiers.push(tipoFestaIdentifier);
        return true;
      });
      return [...tipoFestasToAdd, ...tipoFestaCollection];
    }
    return tipoFestaCollection;
  }
}
