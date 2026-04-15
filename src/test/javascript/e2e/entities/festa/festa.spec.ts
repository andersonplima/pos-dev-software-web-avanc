import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  FestaComponentsPage,
  /* FestaDeleteDialog, */
  FestaUpdatePage
} from './festa.page-object';

const expect = chai.expect;

describe('Festa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let festaComponentsPage: FestaComponentsPage;
  let festaUpdatePage: FestaUpdatePage;
  /* let festaDeleteDialog: FestaDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Festas', async () => {
    await navBarPage.goToEntity('festa');
    festaComponentsPage = new FestaComponentsPage();
    await browser.wait(ec.visibilityOf(festaComponentsPage.title), 5000);
    expect(await festaComponentsPage.getTitle()).to.eq('jhipsterapp1App.festa.home.title');
    await browser.wait(ec.or(ec.visibilityOf(festaComponentsPage.entities), ec.visibilityOf(festaComponentsPage.noResult)), 1000);
  });

  it('should load create Festa page', async () => {
    await festaComponentsPage.clickOnCreateButton();
    festaUpdatePage = new FestaUpdatePage();
    expect(await festaUpdatePage.getPageTitle()).to.eq('jhipsterapp1App.festa.home.createOrEditLabel');
    await festaUpdatePage.cancel();
  });

  /* it('should create and save Festas', async () => {
        const nbButtonsBeforeCreate = await festaComponentsPage.countDeleteButtons();

        await festaComponentsPage.clickOnCreateButton();

        await promise.all([
            festaUpdatePage.setNomeInput('nome'),
            festaUpdatePage.setTemaInput('tema'),
            festaUpdatePage.setValorInput('5'),
            festaUpdatePage.tipoFestaSelectLastOption(),
            festaUpdatePage.clienteSelectLastOption(),
        ]);

        expect(await festaUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
        expect(await festaUpdatePage.getTemaInput()).to.eq('tema', 'Expected Tema value to be equals to tema');
        expect(await festaUpdatePage.getValorInput()).to.eq('5', 'Expected valor value to be equals to 5');

        await festaUpdatePage.save();
        expect(await festaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await festaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Festa', async () => {
        const nbButtonsBeforeDelete = await festaComponentsPage.countDeleteButtons();
        await festaComponentsPage.clickOnLastDeleteButton();

        festaDeleteDialog = new FestaDeleteDialog();
        expect(await festaDeleteDialog.getDialogTitle())
            .to.eq('jhipsterapp1App.festa.delete.question');
        await festaDeleteDialog.clickOnConfirmButton();

        expect(await festaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
