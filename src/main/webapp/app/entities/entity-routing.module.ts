import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'festa',
        data: { pageTitle: 'jhipsterapp1App.festa.home.title' },
        loadChildren: () => import('./festa/festa.module').then(m => m.FestaModule),
      },
      {
        path: 'tipo-festa',
        data: { pageTitle: 'jhipsterapp1App.tipoFesta.home.title' },
        loadChildren: () => import('./tipo-festa/tipo-festa.module').then(m => m.TipoFestaModule),
      },
      {
        path: 'cliente',
        data: { pageTitle: 'jhipsterapp1App.cliente.home.title' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'pedido',
        data: { pageTitle: 'jhipsterapp1App.pedido.home.title' },
        loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule),
      },
      {
        path: 'item-pedido',
        data: { pageTitle: 'jhipsterapp1App.itemPedido.home.title' },
        loadChildren: () => import('./item-pedido/item-pedido.module').then(m => m.ItemPedidoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
