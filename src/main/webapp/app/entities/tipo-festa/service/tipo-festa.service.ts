import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ITipoFesta, NewTipoFesta } from '../tipo-festa.model';

export type PartialUpdateTipoFesta = Partial<ITipoFesta> & Pick<ITipoFesta, 'id'>;

@Injectable()
export class TipoFestasService {
  readonly tipoFestasParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly tipoFestasResource = httpResource<ITipoFesta[]>(() => {
    const params = this.tipoFestasParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of tipoFesta that have been fetched. It is updated when the tipoFestasResource emits a new value.
   * In case of error while fetching the tipoFestas, the signal is set to an empty array.
   */
  readonly tipoFestas = computed(() => (this.tipoFestasResource.hasValue() ? this.tipoFestasResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-festas');
}

@Injectable({ providedIn: 'root' })
export class TipoFestaService extends TipoFestasService {
  protected readonly http = inject(HttpClient);

  create(tipoFesta: NewTipoFesta): Observable<ITipoFesta> {
    return this.http.post<ITipoFesta>(this.resourceUrl, tipoFesta);
  }

  update(tipoFesta: ITipoFesta): Observable<ITipoFesta> {
    return this.http.put<ITipoFesta>(`${this.resourceUrl}/${encodeURIComponent(this.getTipoFestaIdentifier(tipoFesta))}`, tipoFesta);
  }

  partialUpdate(tipoFesta: PartialUpdateTipoFesta): Observable<ITipoFesta> {
    return this.http.patch<ITipoFesta>(`${this.resourceUrl}/${encodeURIComponent(this.getTipoFestaIdentifier(tipoFesta))}`, tipoFesta);
  }

  find(id: number): Observable<ITipoFesta> {
    return this.http.get<ITipoFesta>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITipoFesta[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITipoFesta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
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
