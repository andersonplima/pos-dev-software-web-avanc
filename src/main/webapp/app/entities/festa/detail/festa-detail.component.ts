import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IFesta } from '../festa.model';

@Component({
  selector: 'jhi-festa-detail',
  templateUrl: './festa-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class FestaDetailComponent {
  festa = input<IFesta | null>(null);

  previousState(): void {
    window.history.back();
  }
}
