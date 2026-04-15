import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PedidoFormService } from './pedido-form.service';
import { PedidoService } from '../service/pedido.service';
import { IPedido } from '../pedido.model';

import { PedidoUpdateComponent } from './pedido-update.component';

describe('Pedido Management Update Component', () => {
  let comp: PedidoUpdateComponent;
  let fixture: ComponentFixture<PedidoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pedidoFormService: PedidoFormService;
  let pedidoService: PedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PedidoUpdateComponent],
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
      .overrideTemplate(PedidoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PedidoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pedidoFormService = TestBed.inject(PedidoFormService);
    pedidoService = TestBed.inject(PedidoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const pedido: IPedido = { id: 456 };

      activatedRoute.data = of({ pedido });
      comp.ngOnInit();

      expect(comp.pedido).toEqual(pedido);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPedido>>();
      const pedido = { id: 123 };
      jest.spyOn(pedidoFormService, 'getPedido').mockReturnValue(pedido);
      jest.spyOn(pedidoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pedido }));
      saveSubject.complete();

      // THEN
      expect(pedidoFormService.getPedido).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pedidoService.update).toHaveBeenCalledWith(expect.objectContaining(pedido));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPedido>>();
      const pedido = { id: 123 };
      jest.spyOn(pedidoFormService, 'getPedido').mockReturnValue({ id: null });
      jest.spyOn(pedidoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pedido: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pedido }));
      saveSubject.complete();

      // THEN
      expect(pedidoFormService.getPedido).toHaveBeenCalled();
      expect(pedidoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPedido>>();
      const pedido = { id: 123 };
      jest.spyOn(pedidoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pedido });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pedidoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
