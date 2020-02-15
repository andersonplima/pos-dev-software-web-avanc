import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jhipsterapp1TestModule } from '../../../test.module';
import { FestaUpdateComponent } from 'app/entities/festa/festa-update.component';
import { FestaService } from 'app/entities/festa/festa.service';
import { Festa } from 'app/shared/model/festa.model';

describe('Component Tests', () => {
  describe('Festa Management Update Component', () => {
    let comp: FestaUpdateComponent;
    let fixture: ComponentFixture<FestaUpdateComponent>;
    let service: FestaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jhipsterapp1TestModule],
        declarations: [FestaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FestaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FestaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FestaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Festa(123);
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
        const entity = new Festa();
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
