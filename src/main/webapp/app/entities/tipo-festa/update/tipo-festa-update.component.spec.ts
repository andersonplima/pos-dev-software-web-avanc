import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, from, of } from 'rxjs';

import { TipoFestaService } from '../service/tipo-festa.service';
import { ITipoFesta } from '../tipo-festa.model';
import { TipoFestaFormService } from './tipo-festa-form.service';

import { TipoFestaUpdateComponent } from './tipo-festa-update.component';

describe('TipoFesta Management Update Component', () => {
  let comp: TipoFestaUpdateComponent;
  let fixture: ComponentFixture<TipoFestaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoFestaFormService: TipoFestaFormService;
  let tipoFestaService: TipoFestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoFestaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TipoFestaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoFestaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoFestaFormService = TestBed.inject(TipoFestaFormService);
    tipoFestaService = TestBed.inject(TipoFestaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoFesta: ITipoFesta = { id: 456 };

      activatedRoute.data = of({ tipoFesta });
      comp.ngOnInit();

      expect(comp.tipoFesta).toEqual(tipoFesta);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoFesta>>();
      const tipoFesta = { id: 123 };
      jest.spyOn(tipoFestaFormService, 'getTipoFesta').mockReturnValue(tipoFesta);
      jest.spyOn(tipoFestaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoFesta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoFesta }));
      saveSubject.complete();

      // THEN
      expect(tipoFestaFormService.getTipoFesta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoFestaService.update).toHaveBeenCalledWith(expect.objectContaining(tipoFesta));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoFesta>>();
      const tipoFesta = { id: 123 };
      jest.spyOn(tipoFestaFormService, 'getTipoFesta').mockReturnValue({ id: null });
      jest.spyOn(tipoFestaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoFesta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoFesta }));
      saveSubject.complete();

      // THEN
      expect(tipoFestaFormService.getTipoFesta).toHaveBeenCalled();
      expect(tipoFestaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoFesta>>();
      const tipoFesta = { id: 123 };
      jest.spyOn(tipoFestaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoFesta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoFestaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
