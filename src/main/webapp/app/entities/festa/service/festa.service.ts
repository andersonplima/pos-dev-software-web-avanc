import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IFesta, NewFesta } from '../festa.model';

export type PartialUpdateFesta = Partial<IFesta> & Pick<IFesta, 'id'>;

@Injectable()
export class FestasService {
  readonly festasParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(undefined);
  readonly festasResource = httpResource<IFesta[]>(() => {
    const params = this.festasParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of festa that have been fetched. It is updated when the festasResource emits a new value.
   * In case of error while fetching the festas, the signal is set to an empty array.
   */
  readonly festas = computed(() => (this.festasResource.hasValue() ? this.festasResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/festas');
}

@Injectable({ providedIn: 'root' })
export class FestaService extends FestasService {
  protected readonly http = inject(HttpClient);

  create(festa: NewFesta): Observable<IFesta> {
    return this.http.post<IFesta>(this.resourceUrl, festa);
  }

  update(festa: IFesta): Observable<IFesta> {
    return this.http.put<IFesta>(`${this.resourceUrl}/${encodeURIComponent(this.getFestaIdentifier(festa))}`, festa);
  }

  partialUpdate(festa: PartialUpdateFesta): Observable<IFesta> {
    return this.http.patch<IFesta>(`${this.resourceUrl}/${encodeURIComponent(this.getFestaIdentifier(festa))}`, festa);
  }

  find(id: number): Observable<IFesta> {
    return this.http.get<IFesta>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IFesta[]>> {
    const options = createRequestOption(req);
    return this.http.get<IFesta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getFestaIdentifier(festa: Pick<IFesta, 'id'>): number {
    return festa.id;
  }

  compareFesta(o1: Pick<IFesta, 'id'> | null, o2: Pick<IFesta, 'id'> | null): boolean {
    return o1 && o2 ? this.getFestaIdentifier(o1) === this.getFestaIdentifier(o2) : o1 === o2;
  }

  addFestaToCollectionIfMissing<Type extends Pick<IFesta, 'id'>>(
    festaCollection: Type[],
    ...festasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const festas: Type[] = festasToCheck.filter(isPresent);
    if (festas.length > 0) {
      const festaCollectionIdentifiers = festaCollection.map(festaItem => this.getFestaIdentifier(festaItem));
      const festasToAdd = festas.filter(festaItem => {
        const festaIdentifier = this.getFestaIdentifier(festaItem);
        if (festaCollectionIdentifiers.includes(festaIdentifier)) {
          return false;
        }
        festaCollectionIdentifiers.push(festaIdentifier);
        return true;
      });
      return [...festasToAdd, ...festaCollection];
    }
    return festaCollection;
  }
}
