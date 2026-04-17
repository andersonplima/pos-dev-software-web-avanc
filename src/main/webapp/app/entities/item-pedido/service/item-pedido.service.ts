import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IItemPedido, NewItemPedido } from '../item-pedido.model';

export type PartialUpdateItemPedido = Partial<IItemPedido> & Pick<IItemPedido, 'id'>;

@Injectable()
export class ItemPedidosService {
  readonly itemPedidosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly itemPedidosResource = httpResource<IItemPedido[]>(() => {
    const params = this.itemPedidosParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of itemPedido that have been fetched. It is updated when the itemPedidosResource emits a new value.
   * In case of error while fetching the itemPedidos, the signal is set to an empty array.
   */
  readonly itemPedidos = computed(() => (this.itemPedidosResource.hasValue() ? this.itemPedidosResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/item-pedidos');
}

@Injectable({ providedIn: 'root' })
export class ItemPedidoService extends ItemPedidosService {
  protected readonly http = inject(HttpClient);

  create(itemPedido: NewItemPedido): Observable<IItemPedido> {
    return this.http.post<IItemPedido>(this.resourceUrl, itemPedido);
  }

  update(itemPedido: IItemPedido): Observable<IItemPedido> {
    return this.http.put<IItemPedido>(`${this.resourceUrl}/${encodeURIComponent(this.getItemPedidoIdentifier(itemPedido))}`, itemPedido);
  }

  partialUpdate(itemPedido: PartialUpdateItemPedido): Observable<IItemPedido> {
    return this.http.patch<IItemPedido>(`${this.resourceUrl}/${encodeURIComponent(this.getItemPedidoIdentifier(itemPedido))}`, itemPedido);
  }

  find(id: number): Observable<IItemPedido> {
    return this.http.get<IItemPedido>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IItemPedido[]>> {
    const options = createRequestOption(req);
    return this.http.get<IItemPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getItemPedidoIdentifier(itemPedido: Pick<IItemPedido, 'id'>): number {
    return itemPedido.id;
  }

  compareItemPedido(o1: Pick<IItemPedido, 'id'> | null, o2: Pick<IItemPedido, 'id'> | null): boolean {
    return o1 && o2 ? this.getItemPedidoIdentifier(o1) === this.getItemPedidoIdentifier(o2) : o1 === o2;
  }

  addItemPedidoToCollectionIfMissing<Type extends Pick<IItemPedido, 'id'>>(
    itemPedidoCollection: Type[],
    ...itemPedidosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itemPedidos: Type[] = itemPedidosToCheck.filter(isPresent);
    if (itemPedidos.length > 0) {
      const itemPedidoCollectionIdentifiers = itemPedidoCollection.map(itemPedidoItem => this.getItemPedidoIdentifier(itemPedidoItem));
      const itemPedidosToAdd = itemPedidos.filter(itemPedidoItem => {
        const itemPedidoIdentifier = this.getItemPedidoIdentifier(itemPedidoItem);
        if (itemPedidoCollectionIdentifiers.includes(itemPedidoIdentifier)) {
          return false;
        }
        itemPedidoCollectionIdentifiers.push(itemPedidoIdentifier);
        return true;
      });
      return [...itemPedidosToAdd, ...itemPedidoCollection];
    }
    return itemPedidoCollection;
  }
}
