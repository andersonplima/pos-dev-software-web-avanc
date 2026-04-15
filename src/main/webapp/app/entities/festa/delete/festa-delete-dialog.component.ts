import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

@Component({
  templateUrl: './festa-delete-dialog.component.html',
})
export class FestaDeleteDialogComponent {
  festa?: IFesta;

  constructor(
    protected festaService: FestaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.festaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
