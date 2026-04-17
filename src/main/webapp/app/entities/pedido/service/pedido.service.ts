import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IPedido, NewPedido } from '../pedido.model';

export type PartialUpdatePedido = Partial<IPedido> & Pick<IPedido, 'id'>;

type RestOf<T extends IPedido | NewPedido> = Omit<T, 'dataPedido'> & {
  dataPedido?: string | null;
};

export type RestPedido = RestOf<IPedido>;

export type NewRestPedido = RestOf<NewPedido>;

export type PartialUpdateRestPedido = RestOf<PartialUpdatePedido>;

@Injectable()
export class PedidosService {
  readonly pedidosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly pedidosResource = httpResource<RestPedido[]>(() => {
    const params = this.pedidosParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of pedido that have been fetched. It is updated when the pedidosResource emits a new value.
   * In case of error while fetching the pedidos, the signal is set to an empty array.
   */
  readonly pedidos = computed(() =>
    (this.pedidosResource.hasValue() ? this.pedidosResource.value() : []).map(item => this.convertValueFromServer(item)),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/pedidos');

  protected convertValueFromServer(restPedido: RestPedido): IPedido {
    return {
      ...restPedido,
      dataPedido: restPedido.dataPedido ? dayjs(restPedido.dataPedido) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class PedidoService extends PedidosService {
  protected readonly http = inject(HttpClient);

  create(pedido: NewPedido): Observable<IPedido> {
    const copy = this.convertValueFromClient(pedido);
    return this.http.post<RestPedido>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(pedido: IPedido): Observable<IPedido> {
    const copy = this.convertValueFromClient(pedido);
    return this.http
      .put<RestPedido>(`${this.resourceUrl}/${encodeURIComponent(this.getPedidoIdentifier(pedido))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(pedido: PartialUpdatePedido): Observable<IPedido> {
    const copy = this.convertValueFromClient(pedido);
    return this.http
      .patch<RestPedido>(`${this.resourceUrl}/${encodeURIComponent(this.getPedidoIdentifier(pedido))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<IPedido> {
    return this.http.get<RestPedido>(`${this.resourceUrl}/${encodeURIComponent(id)}`).pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IPedido[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPedido[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getPedidoIdentifier(pedido: Pick<IPedido, 'id'>): number {
    return pedido.id;
  }

  comparePedido(o1: Pick<IPedido, 'id'> | null, o2: Pick<IPedido, 'id'> | null): boolean {
    return o1 && o2 ? this.getPedidoIdentifier(o1) === this.getPedidoIdentifier(o2) : o1 === o2;
  }

  addPedidoToCollectionIfMissing<Type extends Pick<IPedido, 'id'>>(
    pedidoCollection: Type[],
    ...pedidosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pedidos: Type[] = pedidosToCheck.filter(isPresent);
    if (pedidos.length > 0) {
      const pedidoCollectionIdentifiers = pedidoCollection.map(pedidoItem => this.getPedidoIdentifier(pedidoItem));
      const pedidosToAdd = pedidos.filter(pedidoItem => {
        const pedidoIdentifier = this.getPedidoIdentifier(pedidoItem);
        if (pedidoCollectionIdentifiers.includes(pedidoIdentifier)) {
          return false;
        }
        pedidoCollectionIdentifiers.push(pedidoIdentifier);
        return true;
      });
      return [...pedidosToAdd, ...pedidoCollection];
    }
    return pedidoCollection;
  }

  protected convertValueFromClient<T extends IPedido | NewPedido | PartialUpdatePedido>(pedido: T): RestOf<T> {
    return {
      ...pedido,
      dataPedido: pedido.dataPedido?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestPedido): IPedido {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestPedido[]): IPedido[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
