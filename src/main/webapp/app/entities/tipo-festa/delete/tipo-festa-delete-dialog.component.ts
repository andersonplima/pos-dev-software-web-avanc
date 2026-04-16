import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoFesta } from '../tipo-festa.model';
import { TipoFestaService } from '../service/tipo-festa.service';

@Component({
  templateUrl: './tipo-festa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoFestaDeleteDialogComponent {
  tipoFesta?: ITipoFesta;

  protected tipoFestaService = inject(TipoFestaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoFestaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
