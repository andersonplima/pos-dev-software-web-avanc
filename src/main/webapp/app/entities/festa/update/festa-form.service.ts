import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFesta, NewFesta } from '../festa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFesta for edit and NewFestaFormGroupInput for create.
 */
type FestaFormGroupInput = IFesta | PartialWithRequiredKeyOf<NewFesta>;

type FestaFormDefaults = Pick<NewFesta, 'id'>;

type FestaFormGroupContent = {
  id: FormControl<IFesta['id'] | NewFesta['id']>;
  nome: FormControl<IFesta['nome']>;
  tema: FormControl<IFesta['tema']>;
  valor: FormControl<IFesta['valor']>;
  tipoFesta: FormControl<IFesta['tipoFesta']>;
  cliente: FormControl<IFesta['cliente']>;
};

export type FestaFormGroup = FormGroup<FestaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FestaFormService {
  createFestaFormGroup(festa: FestaFormGroupInput = { id: null }): FestaFormGroup {
    const festaRawValue = {
      ...this.getFormDefaults(),
      ...festa,
    };
    return new FormGroup<FestaFormGroupContent>({
      id: new FormControl(
        { value: festaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(festaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      tema: new FormControl(festaRawValue.tema, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      valor: new FormControl(festaRawValue.valor, {
        validators: [Validators.required, Validators.min(0)],
      }),
      tipoFesta: new FormControl(festaRawValue.tipoFesta, {
        validators: [Validators.required],
      }),
      cliente: new FormControl(festaRawValue.cliente, {
        validators: [Validators.required],
      }),
    });
  }

  getFesta(form: FestaFormGroup): IFesta | NewFesta {
    return form.getRawValue() as IFesta | NewFesta;
  }

  resetForm(form: FestaFormGroup, festa: FestaFormGroupInput): void {
    const festaRawValue = { ...this.getFormDefaults(), ...festa };
    form.reset(
      {
        ...festaRawValue,
        id: { value: festaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FestaFormDefaults {
    return {
      id: null,
    };
  }
}
