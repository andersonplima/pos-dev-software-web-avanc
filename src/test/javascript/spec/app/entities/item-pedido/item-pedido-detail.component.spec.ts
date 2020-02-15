import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { ItemPedidoDetailComponent } from 'app/entities/item-pedido/item-pedido-detail.component';
import { ItemPedido } from 'app/shared/model/item-pedido.model';

describe('Component Tests', () => {
  describe('ItemPedido Management Detail Component', () => {
    let comp: ItemPedidoDetailComponent;
    let fixture: ComponentFixture<ItemPedidoDetailComponent>;
    const route = ({ data: of({ itemPedido: new ItemPedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [ItemPedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemPedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemPedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load itemPedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemPedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
