import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ItemPedidoFormService } from './item-pedido-form.service';
import { ItemPedidoService } from '../service/item-pedido.service';
import { IItemPedido } from '../item-pedido.model';
import { IPedido } from 'app/entities/pedido/pedido.model';
import { PedidoService } from 'app/entities/pedido/service/pedido.service';

import { ItemPedidoUpdateComponent } from './item-pedido-update.component';

describe('ItemPedido Management Update Component', () => {
  let comp: ItemPedidoUpdateComponent;
  let fixture: ComponentFixture<ItemPedidoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemPedidoFormService: ItemPedidoFormService;
  let itemPedidoService: ItemPedidoService;
  let pedidoService: PedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ItemPedidoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ItemPedidoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemPedidoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemPedidoFormService = TestBed.inject(ItemPedidoFormService);
    itemPedidoService = TestBed.inject(ItemPedidoService);
    pedidoService = TestBed.inject(PedidoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pedido query and add missing value', () => {
      const itemPedido: IItemPedido = { id: 456 };
      const pedido: IPedido = { id: 609 };
      itemPedido.pedido = pedido;

      const pedidoCollection: IPedido[] = [{ id: 94546 }];
      jest.spyOn(pedidoService, 'query').mockReturnValue(of(new HttpResponse({ body: pedidoCollection })));
      const additionalPedidos = [pedido];
      const expectedCollection: IPedido[] = [...additionalPedidos, ...pedidoCollection];
      jest.spyOn(pedidoService, 'addPedidoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      expect(pedidoService.query).toHaveBeenCalled();
      expect(pedidoService.addPedidoToCollectionIfMissing).toHaveBeenCalledWith(
        pedidoCollection,
        ...additionalPedidos.map(expect.objectContaining)
      );
      expect(comp.pedidosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itemPedido: IItemPedido = { id: 456 };
      const pedido: IPedido = { id: 20604 };
      itemPedido.pedido = pedido;

      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      expect(comp.pedidosSharedCollection).toContain(pedido);
      expect(comp.itemPedido).toEqual(itemPedido);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemPedido>>();
      const itemPedido = { id: 123 };
      jest.spyOn(itemPedidoFormService, 'getItemPedido').mockReturnValue(itemPedido);
      jest.spyOn(itemPedidoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemPedido }));
      saveSubject.complete();

      // THEN
      expect(itemPedidoFormService.getItemPedido).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemPedidoService.update).toHaveBeenCalledWith(expect.objectContaining(itemPedido));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemPedido>>();
      const itemPedido = { id: 123 };
      jest.spyOn(itemPedidoFormService, 'getItemPedido').mockReturnValue({ id: null });
      jest.spyOn(itemPedidoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemPedido: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemPedido }));
      saveSubject.complete();

      // THEN
      expect(itemPedidoFormService.getItemPedido).toHaveBeenCalled();
      expect(itemPedidoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemPedido>>();
      const itemPedido = { id: 123 };
      jest.spyOn(itemPedidoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemPedidoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePedido', () => {
      it('Should forward to pedidoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pedidoService, 'comparePedido');
        comp.comparePedido(entity, entity2);
        expect(pedidoService.comparePedido).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
