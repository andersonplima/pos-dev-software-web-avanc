import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ItemPedidoComponentsPage, ItemPedidoDeleteDialog, ItemPedidoUpdatePage } from './item-pedido.page-object';

const expect = chai.expect;

describe('ItemPedido e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemPedidoComponentsPage: ItemPedidoComponentsPage;
  let itemPedidoUpdatePage: ItemPedidoUpdatePage;
  let itemPedidoDeleteDialog: ItemPedidoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemPedidos', async () => {
    await navBarPage.goToEntity('item-pedido');
    itemPedidoComponentsPage = new ItemPedidoComponentsPage();
    await browser.wait(ec.visibilityOf(itemPedidoComponentsPage.title), 5000);
    expect(await itemPedidoComponentsPage.getTitle()).to.eq('jhipsterapp1App.itemPedido.home.title');
    await browser.wait(ec.or(ec.visibilityOf(itemPedidoComponentsPage.entities), ec.visibilityOf(itemPedidoComponentsPage.noResult)), 1000);
  });

  it('should load create ItemPedido page', async () => {
    await itemPedidoComponentsPage.clickOnCreateButton();
    itemPedidoUpdatePage = new ItemPedidoUpdatePage();
    expect(await itemPedidoUpdatePage.getPageTitle()).to.eq('jhipsterapp1App.itemPedido.home.createOrEditLabel');
    await itemPedidoUpdatePage.cancel();
  });

  it('should create and save ItemPedidos', async () => {
    const nbButtonsBeforeCreate = await itemPedidoComponentsPage.countDeleteButtons();

    await itemPedidoComponentsPage.clickOnCreateButton();

    await promise.all([
      itemPedidoUpdatePage.setNomeItemInput('nomeItem'),
      itemPedidoUpdatePage.setValorItemInput('5'),
      itemPedidoUpdatePage.pedidoSelectLastOption()
    ]);

    expect(await itemPedidoUpdatePage.getNomeItemInput()).to.eq('nomeItem', 'Expected NomeItem value to be equals to nomeItem');
    expect(await itemPedidoUpdatePage.getValorItemInput()).to.eq('5', 'Expected valorItem value to be equals to 5');

    await itemPedidoUpdatePage.save();
    expect(await itemPedidoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemPedidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ItemPedido', async () => {
    const nbButtonsBeforeDelete = await itemPedidoComponentsPage.countDeleteButtons();
    await itemPedidoComponentsPage.clickOnLastDeleteButton();

    itemPedidoDeleteDialog = new ItemPedidoDeleteDialog();
    expect(await itemPedidoDeleteDialog.getDialogTitle()).to.eq('jhipsterapp1App.itemPedido.delete.question');
    await itemPedidoDeleteDialog.clickOnConfirmButton();

    expect(await itemPedidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
