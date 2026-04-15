import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { ItemPedidoUpdateComponent } from 'app/entities/item-pedido/item-pedido-update.component';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';
import { ItemPedido } from 'app/shared/model/item-pedido.model';

describe('Component Tests', () => {
  describe('ItemPedido Management Update Component', () => {
    let comp: ItemPedidoUpdateComponent;
    let fixture: ComponentFixture<ItemPedidoUpdateComponent>;
    let service: ItemPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [ItemPedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemPedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemPedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemPedido(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemPedido();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
