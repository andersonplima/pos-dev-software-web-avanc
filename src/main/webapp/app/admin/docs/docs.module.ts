import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jhipsterapp1SharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [Jhipsterapp1SharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent]
})
export class DocsModule {}
