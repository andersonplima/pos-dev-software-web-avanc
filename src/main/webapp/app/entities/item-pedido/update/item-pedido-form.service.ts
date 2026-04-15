import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IItemPedido, NewItemPedido } from '../item-pedido.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItemPedido for edit and NewItemPedidoFormGroupInput for create.
 */
type ItemPedidoFormGroupInput = IItemPedido | PartialWithRequiredKeyOf<NewItemPedido>;

type ItemPedidoFormDefaults = Pick<NewItemPedido, 'id'>;

type ItemPedidoFormGroupContent = {
  id: FormControl<IItemPedido['id'] | NewItemPedido['id']>;
  nomeItem: FormControl<IItemPedido['nomeItem']>;
  valorItem: FormControl<IItemPedido['valorItem']>;
  pedido: FormControl<IItemPedido['pedido']>;
};

export type ItemPedidoFormGroup = FormGroup<ItemPedidoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemPedidoFormService {
  createItemPedidoFormGroup(itemPedido: ItemPedidoFormGroupInput = { id: null }): ItemPedidoFormGroup {
    const itemPedidoRawValue = {
      ...this.getFormDefaults(),
      ...itemPedido,
    };
    return new FormGroup<ItemPedidoFormGroupContent>({
      id: new FormControl(
        { value: itemPedidoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomeItem: new FormControl(itemPedidoRawValue.nomeItem, {
        validators: [Validators.required],
      }),
      valorItem: new FormControl(itemPedidoRawValue.valorItem),
      pedido: new FormControl(itemPedidoRawValue.pedido),
    });
  }

  getItemPedido(form: ItemPedidoFormGroup): IItemPedido | NewItemPedido {
    return form.getRawValue() as IItemPedido | NewItemPedido;
  }

  resetForm(form: ItemPedidoFormGroup, itemPedido: ItemPedidoFormGroupInput): void {
    const itemPedidoRawValue = { ...this.getFormDefaults(), ...itemPedido };
    form.reset(
      {
        ...itemPedidoRawValue,
        id: { value: itemPedidoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ItemPedidoFormDefaults {
    return {
      id: null,
    };
  }
}
