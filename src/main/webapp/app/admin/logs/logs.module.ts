import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jhipsterapp1SharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [Jhipsterapp1SharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent]
})
export class LogsModule {}
