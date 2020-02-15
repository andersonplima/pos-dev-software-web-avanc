import { element, by, ElementFinder } from 'protractor';

export class PedidoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pedido div table .btn-danger'));
  title = element.all(by.css('jhi-pedido div h2#page-heading span')).first();
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

export class PedidoUpdatePage {
  pageTitle = element(by.id('jhi-pedido-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dataPedidoInput = element(by.id('field_dataPedido'));
  valorPedidoInput = element(by.id('field_valorPedido'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDataPedidoInput(dataPedido: string): Promise<void> {
    await this.dataPedidoInput.sendKeys(dataPedido);
  }

  async getDataPedidoInput(): Promise<string> {
    return await this.dataPedidoInput.getAttribute('value');
  }

  async setValorPedidoInput(valorPedido: string): Promise<void> {
    await this.valorPedidoInput.sendKeys(valorPedido);
  }

  async getValorPedidoInput(): Promise<string> {
    return await this.valorPedidoInput.getAttribute('value');
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

export class PedidoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pedido-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pedido'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
