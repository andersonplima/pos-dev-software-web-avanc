import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

@Component({
  templateUrl: './festa-delete-dialog.html',
  imports: [TranslateDirective, TranslateModule, FormsModule, FontAwesomeModule, AlertError],
})
export class FestaDeleteDialog {
  festa?: IFesta;

  protected readonly festaService = inject(FestaService);
  protected readonly activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.festaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
