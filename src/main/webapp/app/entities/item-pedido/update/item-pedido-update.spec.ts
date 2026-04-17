import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IPedido } from 'app/entities/pedido/pedido.model';
import { PedidoService } from 'app/entities/pedido/service/pedido.service';
import { IItemPedido } from '../item-pedido.model';
import { ItemPedidoService } from '../service/item-pedido.service';

import { ItemPedidoFormService } from './item-pedido-form.service';
import { ItemPedidoUpdate } from './item-pedido-update';

describe('ItemPedido Management Update Component', () => {
  let comp: ItemPedidoUpdate;
  let fixture: ComponentFixture<ItemPedidoUpdate>;
  let activatedRoute: ActivatedRoute;
  let itemPedidoFormService: ItemPedidoFormService;
  let itemPedidoService: ItemPedidoService;
  let pedidoService: PedidoService;

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

    fixture = TestBed.createComponent(ItemPedidoUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemPedidoFormService = TestBed.inject(ItemPedidoFormService);
    itemPedidoService = TestBed.inject(ItemPedidoService);
    pedidoService = TestBed.inject(PedidoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Pedido query and add missing value', () => {
      const itemPedido: IItemPedido = { id: 30572 };
      const pedido: IPedido = { id: 24162 };
      itemPedido.pedido = pedido;

      const pedidoCollection: IPedido[] = [{ id: 24162 }];
      vitest.spyOn(pedidoService, 'query').mockReturnValue(of(new HttpResponse({ body: pedidoCollection })));
      const additionalPedidos = [pedido];
      const expectedCollection: IPedido[] = [...additionalPedidos, ...pedidoCollection];
      vitest.spyOn(pedidoService, 'addPedidoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      expect(pedidoService.query).toHaveBeenCalled();
      expect(pedidoService.addPedidoToCollectionIfMissing).toHaveBeenCalledWith(
        pedidoCollection,
        ...additionalPedidos.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.pedidosSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const itemPedido: IItemPedido = { id: 30572 };
      const pedido: IPedido = { id: 24162 };
      itemPedido.pedido = pedido;

      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      expect(comp.pedidosSharedCollection()).toContainEqual(pedido);
      expect(comp.itemPedido).toEqual(itemPedido);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IItemPedido>();
      const itemPedido = { id: 14110 };
      vitest.spyOn(itemPedidoFormService, 'getItemPedido').mockReturnValue(itemPedido);
      vitest.spyOn(itemPedidoService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(itemPedido);
      saveSubject.complete();

      // THEN
      expect(itemPedidoFormService.getItemPedido).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemPedidoService.update).toHaveBeenCalledWith(expect.objectContaining(itemPedido));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IItemPedido>();
      const itemPedido = { id: 14110 };
      vitest.spyOn(itemPedidoFormService, 'getItemPedido').mockReturnValue({ id: null });
      vitest.spyOn(itemPedidoService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemPedido: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(itemPedido);
      saveSubject.complete();

      // THEN
      expect(itemPedidoFormService.getItemPedido).toHaveBeenCalled();
      expect(itemPedidoService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IItemPedido>();
      const itemPedido = { id: 14110 };
      vitest.spyOn(itemPedidoService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemPedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemPedidoService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePedido', () => {
      it('should forward to pedidoService', () => {
        const entity = { id: 24162 };
        const entity2 = { id: 19016 };
        vitest.spyOn(pedidoService, 'comparePedido');
        comp.comparePedido(entity, entity2);
        expect(pedidoService.comparePedido).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
