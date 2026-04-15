import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FestaComponent } from './list/festa.component';
import { FestaDetailComponent } from './detail/festa-detail.component';
import { FestaUpdateComponent } from './update/festa-update.component';
import { FestaDeleteDialogComponent } from './delete/festa-delete-dialog.component';
import { FestaRoutingModule } from './route/festa-routing.module';

@NgModule({
  imports: [SharedModule, FestaRoutingModule],
  declarations: [FestaComponent, FestaDetailComponent, FestaUpdateComponent, FestaDeleteDialogComponent],
})
export class FestaModule {}
