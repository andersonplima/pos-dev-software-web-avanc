import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ITipoFesta } from '../tipo-festa.model';

@Component({
  selector: 'jhi-tipo-festa-detail',
  templateUrl: './tipo-festa-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class TipoFestaDetailComponent {
  tipoFesta = input<ITipoFesta | null>(null);

  previousState(): void {
    window.history.back();
  }
}
