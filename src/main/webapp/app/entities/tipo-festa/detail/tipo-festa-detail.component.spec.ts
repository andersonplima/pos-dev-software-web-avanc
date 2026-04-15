import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoFestaDetailComponent } from './tipo-festa-detail.component';

describe('TipoFesta Management Detail Component', () => {
  let comp: TipoFestaDetailComponent;
  let fixture: ComponentFixture<TipoFestaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoFestaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoFesta: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoFestaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoFestaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoFesta on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoFesta).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
