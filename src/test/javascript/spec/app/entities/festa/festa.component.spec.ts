import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { FestaComponent } from 'app/entities/festa/festa.component';
import { FestaService } from 'app/entities/festa/festa.service';
import { Festa } from 'app/shared/model/festa.model';

describe('Component Tests', () => {
  describe('Festa Management Component', () => {
    let comp: FestaComponent;
    let fixture: ComponentFixture<FestaComponent>;
    let service: FestaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [FestaComponent]
      })
        .overrideTemplate(FestaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FestaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FestaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Festa(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.festas && comp.festas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
