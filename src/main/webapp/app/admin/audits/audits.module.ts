import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jhipsterapp1SharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [Jhipsterapp1SharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent]
})
export class AuditsModule {}
