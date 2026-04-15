import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoFesta } from 'app/shared/model/tipo-festa.model';
import { TipoFestaService } from './tipo-festa.service';
import { TipoFestaDeleteDialogComponent } from './tipo-festa-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-festa',
  templateUrl: './tipo-festa.component.html'
})
export class TipoFestaComponent implements OnInit, OnDestroy {
  tipoFestas?: ITipoFesta[];
  eventSubscriber?: Subscription;

  constructor(protected tipoFestaService: TipoFestaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tipoFestaService.query().subscribe((res: HttpResponse<ITipoFesta[]>) => (this.tipoFestas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoFestas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoFesta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoFestas(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoFestaListModification', () => this.loadAll());
  }

  delete(tipoFesta: ITipoFesta): void {
    const modalRef = this.modalService.open(TipoFestaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoFesta = tipoFesta;
  }
}
