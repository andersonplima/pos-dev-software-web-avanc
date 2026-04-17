import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IPedido } from '../pedido.model';
import { PedidoService } from '../service/pedido.service';

import { PedidoFormService } from './pedido-form.service';
import { PedidoUpdate } from './pedido-update';

describe('Pedido Management Update Component', () => {
  let comp: PedidoUpdate;
  let fixture: ComponentFixture<PedidoUpdate>;
  let activatedRoute: ActivatedRoute;
  let pedidoFormService: PedidoFormService;
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

    fixture = TestBed.createComponent(PedidoUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pedidoFormService = TestBed.inject(PedidoFormService);
    pedidoService = TestBed.inject(PedidoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const pedido: IPedido = { id: 19016 };

      activatedRoute.data = of({ pedido });
      comp.ngOnInit();

      expect(comp.pedido).toEqual(pedido);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPedido>();
      const pedido = { id: 24162 };
      vitest.spyOn(pedidoFormService, 'getPedido').mockReturnValue(pedido);
      vitest.spyOn(pedidoService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(pedido);
      saveSubject.complete();

      // THEN
      expect(pedidoFormService.getPedido).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pedidoService.update).toHaveBeenCalledWith(expect.objectContaining(pedido));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IPedido>();
      const pedido = { id: 24162 };
      vitest.spyOn(pedidoFormService, 'getPedido').mockReturnValue({ id: null });
      vitest.spyOn(pedidoService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pedido: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(pedido);
      saveSubject.complete();

      // THEN
      expect(pedidoFormService.getPedido).toHaveBeenCalled();
      expect(pedidoService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IPedido>();
      const pedido = { id: 24162 };
      vitest.spyOn(pedidoService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pedidoService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
