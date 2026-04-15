import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ItemPedidoDetailComponent } from './item-pedido-detail.component';

describe('ItemPedido Management Detail Component', () => {
  let comp: ItemPedidoDetailComponent;
  let fixture: ComponentFixture<ItemPedidoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPedidoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ itemPedido: { id: 123 } }) },
        },
      ],
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
      expect(comp.itemPedido).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
