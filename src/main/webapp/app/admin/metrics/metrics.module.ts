import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jhipsterapp1SharedModule } from 'app/shared/shared.module';

import { MetricsComponent } from './metrics.component';

import { metricsRoute } from './metrics.route';

@NgModule({
  imports: [Jhipsterapp1SharedModule, RouterModule.forChild([metricsRoute])],
  declarations: [MetricsComponent]
})
export class MetricsModule {}
