import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { FestaDetailComponent } from 'app/entities/festa/festa-detail.component';
import { Festa } from 'app/shared/model/festa.model';

describe('Component Tests', () => {
  describe('Festa Management Detail Component', () => {
    let comp: FestaDetailComponent;
    let fixture: ComponentFixture<FestaDetailComponent>;
    const route = ({ data: of({ festa: new Festa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [FestaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FestaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FestaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load festa on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.festa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
