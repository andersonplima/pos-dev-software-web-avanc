import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(100)]],
    cpf: [null, [Validators.required, Validators.pattern('[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}')]]
  });

  constructor(protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cpf: this.editForm.get(['cpf'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
