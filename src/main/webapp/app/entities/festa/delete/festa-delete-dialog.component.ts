import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

@Component({
  templateUrl: './festa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FestaDeleteDialogComponent {
  festa?: IFesta;

  protected festaService = inject(FestaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.festaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
