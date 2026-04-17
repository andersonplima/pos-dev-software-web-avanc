import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'jhipsterapp1App.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'festa',
    data: { pageTitle: 'jhipsterapp1App.festa.home.title' },
    loadChildren: () => import('./festa/festa.routes'),
  },
  {
    path: 'tipo-festa',
    data: { pageTitle: 'jhipsterapp1App.tipoFesta.home.title' },
    loadChildren: () => import('./tipo-festa/tipo-festa.routes'),
  },
  {
    path: 'cliente',
    data: { pageTitle: 'jhipsterapp1App.cliente.home.title' },
    loadChildren: () => import('./cliente/cliente.routes'),
  },
  {
    path: 'pedido',
    data: { pageTitle: 'jhipsterapp1App.pedido.home.title' },
    loadChildren: () => import('./pedido/pedido.routes'),
  },
  {
    path: 'item-pedido',
    data: { pageTitle: 'jhipsterapp1App.itemPedido.home.title' },
    loadChildren: () => import('./item-pedido/item-pedido.routes'),
  },
  {
    path: 'user-management',
    data: { pageTitle: 'userManagement.home.title' },
    loadChildren: () => import('./admin/user-management/user-management.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
