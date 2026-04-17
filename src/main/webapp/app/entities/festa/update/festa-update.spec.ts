import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { TipoFestaService } from 'app/entities/tipo-festa/service/tipo-festa.service';
import { ITipoFesta } from 'app/entities/tipo-festa/tipo-festa.model';
import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';

import { FestaFormService } from './festa-form.service';
import { FestaUpdate } from './festa-update';

describe('Festa Management Update Component', () => {
  let comp: FestaUpdate;
  let fixture: ComponentFixture<FestaUpdate>;
  let activatedRoute: ActivatedRoute;
  let festaFormService: FestaFormService;
  let festaService: FestaService;
  let tipoFestaService: TipoFestaService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(FestaUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    festaFormService = TestBed.inject(FestaFormService);
    festaService = TestBed.inject(FestaService);
    tipoFestaService = TestBed.inject(TipoFestaService);
    clienteService = TestBed.inject(ClienteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TipoFesta query and add missing value', () => {
      const festa: IFesta = { id: 4333 };
      const tipoFesta: ITipoFesta = { id: 12172 };
      festa.tipoFesta = tipoFesta;

      const tipoFestaCollection: ITipoFesta[] = [{ id: 12172 }];
      vitest.spyOn(tipoFestaService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoFestaCollection })));
      const additionalTipoFestas = [tipoFesta];
      const expectedCollection: ITipoFesta[] = [...additionalTipoFestas, ...tipoFestaCollection];
      vitest.spyOn(tipoFestaService, 'addTipoFestaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      expect(tipoFestaService.query).toHaveBeenCalled();
      expect(tipoFestaService.addTipoFestaToCollectionIfMissing).toHaveBeenCalledWith(
        tipoFestaCollection,
        ...additionalTipoFestas.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.tipoFestasSharedCollection()).toEqual(expectedCollection);
    });

    it('should call Cliente query and add missing value', () => {
      const festa: IFesta = { id: 4333 };
      const cliente: ICliente = { id: 13484 };
      festa.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 13484 }];
      vitest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      vitest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(
        clienteCollection,
        ...additionalClientes.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.clientesSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const festa: IFesta = { id: 4333 };
      const tipoFesta: ITipoFesta = { id: 12172 };
      festa.tipoFesta = tipoFesta;
      const cliente: ICliente = { id: 13484 };
      festa.cliente = cliente;

      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      expect(comp.tipoFestasSharedCollection()).toContainEqual(tipoFesta);
      expect(comp.clientesSharedCollection()).toContainEqual(cliente);
      expect(comp.festa).toEqual(festa);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IFesta>();
      const festa = { id: 19278 };
      vitest.spyOn(festaFormService, 'getFesta').mockReturnValue(festa);
      vitest.spyOn(festaService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(festa);
      saveSubject.complete();

      // THEN
      expect(festaFormService.getFesta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(festaService.update).toHaveBeenCalledWith(expect.objectContaining(festa));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IFesta>();
      const festa = { id: 19278 };
      vitest.spyOn(festaFormService, 'getFesta').mockReturnValue({ id: null });
      vitest.spyOn(festaService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(festa);
      saveSubject.complete();

      // THEN
      expect(festaFormService.getFesta).toHaveBeenCalled();
      expect(festaService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IFesta>();
      const festa = { id: 19278 };
      vitest.spyOn(festaService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(festaService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoFesta', () => {
      it('should forward to tipoFestaService', () => {
        const entity = { id: 12172 };
        const entity2 = { id: 10605 };
        vitest.spyOn(tipoFestaService, 'compareTipoFesta');
        comp.compareTipoFesta(entity, entity2);
        expect(tipoFestaService.compareTipoFesta).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCliente', () => {
      it('should forward to clienteService', () => {
        const entity = { id: 13484 };
        const entity2 = { id: 20795 };
        vitest.spyOn(clienteService, 'compareCliente');
        comp.compareCliente(entity, entity2);
        expect(clienteService.compareCliente).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
