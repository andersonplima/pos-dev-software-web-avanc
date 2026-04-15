import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoFestaComponent } from './list/tipo-festa.component';
import { TipoFestaDetailComponent } from './detail/tipo-festa-detail.component';
import { TipoFestaUpdateComponent } from './update/tipo-festa-update.component';
import { TipoFestaDeleteDialogComponent } from './delete/tipo-festa-delete-dialog.component';
import { TipoFestaRoutingModule } from './route/tipo-festa-routing.module';

@NgModule({
  imports: [SharedModule, TipoFestaRoutingModule],
  declarations: [TipoFestaComponent, TipoFestaDetailComponent, TipoFestaUpdateComponent, TipoFestaDeleteDialogComponent],
})
export class TipoFestaModule {}
