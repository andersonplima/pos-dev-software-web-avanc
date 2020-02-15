import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { TipoFestaDetailComponent } from 'app/entities/tipo-festa/tipo-festa-detail.component';
import { TipoFesta } from 'app/shared/model/tipo-festa.model';

describe('Component Tests', () => {
  describe('TipoFesta Management Detail Component', () => {
    let comp: TipoFestaDetailComponent;
    let fixture: ComponentFixture<TipoFestaDetailComponent>;
    const route = ({ data: of({ tipoFesta: new TipoFesta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [TipoFestaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
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
        expect(comp.tipoFesta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
