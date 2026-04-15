import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoFesta } from '../tipo-festa.model';
import { TipoFestaService } from '../service/tipo-festa.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './tipo-festa-delete-dialog.component.html',
})
export class TipoFestaDeleteDialogComponent {
  tipoFesta?: ITipoFesta;

  constructor(protected tipoFestaService: TipoFestaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoFestaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
