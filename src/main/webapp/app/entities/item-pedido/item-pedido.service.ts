import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemPedido } from 'app/shared/model/item-pedido.model';

type EntityResponseType = HttpResponse<IItemPedido>;
type EntityArrayResponseType = HttpResponse<IItemPedido[]>;

@Injectable({ providedIn: 'root' })
export class ItemPedidoService {
  public resourceUrl = SERVER_API_URL + 'api/item-pedidos';

  constructor(protected http: HttpClient) {}

  create(itemPedido: IItemPedido): Observable<EntityResponseType> {
    return this.http.post<IItemPedido>(this.resourceUrl, itemPedido, { observe: 'response' });
  }

  update(itemPedido: IItemPedido): Observable<EntityResponseType> {
    return this.http.put<IItemPedido>(this.resourceUrl, itemPedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
