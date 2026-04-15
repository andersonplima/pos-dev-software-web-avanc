import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFesta } from 'app/shared/model/festa.model';
import { FestaService } from './festa.service';
import { FestaDeleteDialogComponent } from './festa-delete-dialog.component';

@Component({
  selector: 'jhi-festa',
  templateUrl: './festa.component.html'
})
export class FestaComponent implements OnInit, OnDestroy {
  festas?: IFesta[];
  eventSubscriber?: Subscription;

  constructor(protected festaService: FestaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.festaService.query().subscribe((res: HttpResponse<IFesta[]>) => (this.festas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFestas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFesta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFestas(): void {
    this.eventSubscriber = this.eventManager.subscribe('festaListModification', () => this.loadAll());
  }

  delete(festa: IFesta): void {
    const modalRef = this.modalService.open(FestaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.festa = festa;
  }
}
