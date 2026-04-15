import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { TipoFestaUpdateComponent } from 'app/entities/tipo-festa/tipo-festa-update.component';
import { TipoFestaService } from 'app/entities/tipo-festa/tipo-festa.service';
import { TipoFesta } from 'app/shared/model/tipo-festa.model';

describe('Component Tests', () => {
  describe('TipoFesta Management Update Component', () => {
    let comp: TipoFestaUpdateComponent;
    let fixture: ComponentFixture<TipoFestaUpdateComponent>;
    let service: TipoFestaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [TipoFestaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoFestaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoFestaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoFestaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoFesta(123);
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
        const entity = new TipoFesta();
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
