import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoFesta } from 'app/shared/model/tipo-festa.model';
import { TipoFestaService } from './tipo-festa.service';

@Component({
  templateUrl: './tipo-festa-delete-dialog.component.html'
})
export class TipoFestaDeleteDialogComponent {
  tipoFesta?: ITipoFesta;

  constructor(protected tipoFestaService: TipoFestaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoFestaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoFestaListModification');
      this.activeModal.close();
    });
  }
}
