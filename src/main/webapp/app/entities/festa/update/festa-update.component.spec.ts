import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITipoFesta } from 'app/entities/tipo-festa/tipo-festa.model';
import { TipoFestaService } from 'app/entities/tipo-festa/service/tipo-festa.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IFesta } from '../festa.model';
import { FestaService } from '../service/festa.service';
import { FestaFormService } from './festa-form.service';

import { FestaUpdateComponent } from './festa-update.component';

describe('Festa Management Update Component', () => {
  let comp: FestaUpdateComponent;
  let fixture: ComponentFixture<FestaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let festaFormService: FestaFormService;
  let festaService: FestaService;
  let tipoFestaService: TipoFestaService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FestaUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FestaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FestaUpdateComponent);
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
      jest.spyOn(tipoFestaService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoFestaCollection })));
      const additionalTipoFestas = [tipoFesta];
      const expectedCollection: ITipoFesta[] = [...additionalTipoFestas, ...tipoFestaCollection];
      jest.spyOn(tipoFestaService, 'addTipoFestaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      expect(tipoFestaService.query).toHaveBeenCalled();
      expect(tipoFestaService.addTipoFestaToCollectionIfMissing).toHaveBeenCalledWith(
        tipoFestaCollection,
        ...additionalTipoFestas.map(expect.objectContaining),
      );
      expect(comp.tipoFestasSharedCollection).toEqual(expectedCollection);
    });

    it('should call Cliente query and add missing value', () => {
      const festa: IFesta = { id: 4333 };
      const cliente: ICliente = { id: 13484 };
      festa.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 13484 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(
        clienteCollection,
        ...additionalClientes.map(expect.objectContaining),
      );
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const festa: IFesta = { id: 4333 };
      const tipoFesta: ITipoFesta = { id: 12172 };
      festa.tipoFesta = tipoFesta;
      const cliente: ICliente = { id: 13484 };
      festa.cliente = cliente;

      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      expect(comp.tipoFestasSharedCollection).toContainEqual(tipoFesta);
      expect(comp.clientesSharedCollection).toContainEqual(cliente);
      expect(comp.festa).toEqual(festa);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFesta>>();
      const festa = { id: 19278 };
      jest.spyOn(festaFormService, 'getFesta').mockReturnValue(festa);
      jest.spyOn(festaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: festa }));
      saveSubject.complete();

      // THEN
      expect(festaFormService.getFesta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(festaService.update).toHaveBeenCalledWith(expect.objectContaining(festa));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFesta>>();
      const festa = { id: 19278 };
      jest.spyOn(festaFormService, 'getFesta').mockReturnValue({ id: null });
      jest.spyOn(festaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: festa }));
      saveSubject.complete();

      // THEN
      expect(festaFormService.getFesta).toHaveBeenCalled();
      expect(festaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFesta>>();
      const festa = { id: 19278 };
      jest.spyOn(festaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(festaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoFesta', () => {
      it('should forward to tipoFestaService', () => {
        const entity = { id: 12172 };
        const entity2 = { id: 10605 };
        jest.spyOn(tipoFestaService, 'compareTipoFesta');
        comp.compareTipoFesta(entity, entity2);
        expect(tipoFestaService.compareTipoFesta).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCliente', () => {
      it('should forward to clienteService', () => {
        const entity = { id: 13484 };
        const entity2 = { id: 20795 };
        jest.spyOn(clienteService, 'compareCliente');
        comp.compareCliente(entity, entity2);
        expect(clienteService.compareCliente).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
