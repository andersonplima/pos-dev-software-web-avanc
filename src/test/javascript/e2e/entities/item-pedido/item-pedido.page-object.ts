import { element, by, ElementFinder } from 'protractor';

export class ItemPedidoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-pedido div table .btn-danger'));
  title = element.all(by.css('jhi-item-pedido div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ItemPedidoUpdatePage {
  pageTitle = element(by.id('jhi-item-pedido-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeItemInput = element(by.id('field_nomeItem'));
  valorItemInput = element(by.id('field_valorItem'));

  pedidoSelect = element(by.id('field_pedido'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeItemInput(nomeItem: string): Promise<void> {
    await this.nomeItemInput.sendKeys(nomeItem);
  }

  async getNomeItemInput(): Promise<string> {
    return await this.nomeItemInput.getAttribute('value');
  }

  async setValorItemInput(valorItem: string): Promise<void> {
    await this.valorItemInput.sendKeys(valorItem);
  }

  async getValorItemInput(): Promise<string> {
    return await this.valorItemInput.getAttribute('value');
  }

  async pedidoSelectLastOption(): Promise<void> {
    await this.pedidoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async pedidoSelectOption(option: string): Promise<void> {
    await this.pedidoSelect.sendKeys(option);
  }

  getPedidoSelect(): ElementFinder {
    return this.pedidoSelect;
  }

  async getPedidoSelectedOption(): Promise<string> {
    return await this.pedidoSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ItemPedidoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemPedido-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemPedido'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
