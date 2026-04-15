import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFesta, NewFesta } from '../festa.model';

export type PartialUpdateFesta = Partial<IFesta> & Pick<IFesta, 'id'>;

export type EntityResponseType = HttpResponse<IFesta>;
export type EntityArrayResponseType = HttpResponse<IFesta[]>;

@Injectable({ providedIn: 'root' })
export class FestaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/festas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(festa: NewFesta): Observable<EntityResponseType> {
    return this.http.post<IFesta>(this.resourceUrl, festa, { observe: 'response' });
  }

  update(festa: IFesta): Observable<EntityResponseType> {
    return this.http.put<IFesta>(`${this.resourceUrl}/${this.getFestaIdentifier(festa)}`, festa, { observe: 'response' });
  }

  partialUpdate(festa: PartialUpdateFesta): Observable<EntityResponseType> {
    return this.http.patch<IFesta>(`${this.resourceUrl}/${this.getFestaIdentifier(festa)}`, festa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFesta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFesta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
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
      const festaCollectionIdentifiers = festaCollection.map(festaItem => this.getFestaIdentifier(festaItem)!);
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
