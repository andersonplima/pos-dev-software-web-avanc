import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoFestaComponentsPage, TipoFestaDeleteDialog, TipoFestaUpdatePage } from './tipo-festa.page-object';

const expect = chai.expect;

describe('TipoFesta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoFestaComponentsPage: TipoFestaComponentsPage;
  let tipoFestaUpdatePage: TipoFestaUpdatePage;
  let tipoFestaDeleteDialog: TipoFestaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoFestas', async () => {
    await navBarPage.goToEntity('tipo-festa');
    tipoFestaComponentsPage = new TipoFestaComponentsPage();
    await browser.wait(ec.visibilityOf(tipoFestaComponentsPage.title), 5000);
    expect(await tipoFestaComponentsPage.getTitle()).to.eq('jhipsterapp1App.tipoFesta.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tipoFestaComponentsPage.entities), ec.visibilityOf(tipoFestaComponentsPage.noResult)), 1000);
  });

  it('should load create TipoFesta page', async () => {
    await tipoFestaComponentsPage.clickOnCreateButton();
    tipoFestaUpdatePage = new TipoFestaUpdatePage();
    expect(await tipoFestaUpdatePage.getPageTitle()).to.eq('jhipsterapp1App.tipoFesta.home.createOrEditLabel');
    await tipoFestaUpdatePage.cancel();
  });

  it('should create and save TipoFestas', async () => {
    const nbButtonsBeforeCreate = await tipoFestaComponentsPage.countDeleteButtons();

    await tipoFestaComponentsPage.clickOnCreateButton();

    await promise.all([tipoFestaUpdatePage.setNomeInput('nome'), tipoFestaUpdatePage.setDescricaoInput('descricao')]);

    expect(await tipoFestaUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await tipoFestaUpdatePage.getDescricaoInput()).to.eq('descricao', 'Expected Descricao value to be equals to descricao');

    await tipoFestaUpdatePage.save();
    expect(await tipoFestaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoFestaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoFesta', async () => {
    const nbButtonsBeforeDelete = await tipoFestaComponentsPage.countDeleteButtons();
    await tipoFestaComponentsPage.clickOnLastDeleteButton();

    tipoFestaDeleteDialog = new TipoFestaDeleteDialog();
    expect(await tipoFestaDeleteDialog.getDialogTitle()).to.eq('jhipsterapp1App.tipoFesta.delete.question');
    await tipoFestaDeleteDialog.clickOnConfirmButton();

    expect(await tipoFestaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
