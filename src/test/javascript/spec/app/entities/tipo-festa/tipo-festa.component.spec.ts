import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { TipoFestaComponent } from 'app/entities/tipo-festa/tipo-festa.component';
import { TipoFestaService } from 'app/entities/tipo-festa/tipo-festa.service';
import { TipoFesta } from 'app/shared/model/tipo-festa.model';

describe('Component Tests', () => {
  describe('TipoFesta Management Component', () => {
    let comp: TipoFestaComponent;
    let fixture: ComponentFixture<TipoFestaComponent>;
    let service: TipoFestaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [TipoFestaComponent]
      })
        .overrideTemplate(TipoFestaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoFestaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoFestaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoFesta(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoFestas && comp.tipoFestas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
