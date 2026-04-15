import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITipoFesta, NewTipoFesta } from '../tipo-festa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoFesta for edit and NewTipoFestaFormGroupInput for create.
 */
type TipoFestaFormGroupInput = ITipoFesta | PartialWithRequiredKeyOf<NewTipoFesta>;

type TipoFestaFormDefaults = Pick<NewTipoFesta, 'id'>;

type TipoFestaFormGroupContent = {
  id: FormControl<ITipoFesta['id'] | NewTipoFesta['id']>;
  nome: FormControl<ITipoFesta['nome']>;
  descricao: FormControl<ITipoFesta['descricao']>;
};

export type TipoFestaFormGroup = FormGroup<TipoFestaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoFestaFormService {
  createTipoFestaFormGroup(tipoFesta: TipoFestaFormGroupInput = { id: null }): TipoFestaFormGroup {
    const tipoFestaRawValue = {
      ...this.getFormDefaults(),
      ...tipoFesta,
    };
    return new FormGroup<TipoFestaFormGroupContent>({
      id: new FormControl(
        { value: tipoFestaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(tipoFestaRawValue.nome, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      descricao: new FormControl(tipoFestaRawValue.descricao, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
    });
  }

  getTipoFesta(form: TipoFestaFormGroup): ITipoFesta | NewTipoFesta {
    return form.getRawValue() as ITipoFesta | NewTipoFesta;
  }

  resetForm(form: TipoFestaFormGroup, tipoFesta: TipoFestaFormGroupInput): void {
    const tipoFestaRawValue = { ...this.getFormDefaults(), ...tipoFesta };
    form.reset(
      {
        ...tipoFestaRawValue,
        id: { value: tipoFestaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TipoFestaFormDefaults {
    return {
      id: null,
    };
  }
}
