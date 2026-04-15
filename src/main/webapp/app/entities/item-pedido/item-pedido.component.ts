import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemPedido } from 'app/shared/model/item-pedido.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ItemPedidoService } from './item-pedido.service';
import { ItemPedidoDeleteDialogComponent } from './item-pedido-delete-dialog.component';

@Component({
  selector: 'jhi-item-pedido',
  templateUrl: './item-pedido.component.html'
})
export class ItemPedidoComponent implements OnInit, OnDestroy {
  itemPedidos: IItemPedido[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected itemPedidoService: ItemPedidoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.itemPedidos = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.itemPedidoService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IItemPedido[]>) => this.paginateItemPedidos(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.itemPedidos = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInItemPedidos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IItemPedido): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInItemPedidos(): void {
    this.eventSubscriber = this.eventManager.subscribe('itemPedidoListModification', () => this.reset());
  }

  delete(itemPedido: IItemPedido): void {
    const modalRef = this.modalService.open(ItemPedidoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemPedido = itemPedido;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateItemPedidos(data: IItemPedido[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.itemPedidos.push(data[i]);
      }
    }
  }
}
