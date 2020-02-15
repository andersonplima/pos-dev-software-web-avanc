import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFesta } from 'app/shared/model/festa.model';
import { FestaService } from './festa.service';

@Component({
  templateUrl: './festa-delete-dialog.component.html'
})
export class FestaDeleteDialogComponent {
  festa?: IFesta;

  constructor(protected festaService: FestaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.festaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('festaListModification');
      this.activeModal.close();
    });
  }
}
