import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'festa',
        loadChildren: () => import('./festa/festa.module').then(m => m.Jhipsterapp1FestaModule)
      },
      {
        path: 'tipo-festa',
        loadChildren: () => import('./tipo-festa/tipo-festa.module').then(m => m.Jhipsterapp1TipoFestaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.Jhipsterapp1ClienteModule)
      },
      {
        path: 'pedido',
        loadChildren: () => import('./pedido/pedido.module').then(m => m.Jhipsterapp1PedidoModule)
      },
      {
        path: 'item-pedido',
        loadChildren: () => import('./item-pedido/item-pedido.module').then(m => m.Jhipsterapp1ItemPedidoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Jhipsterapp1EntityModule {}
