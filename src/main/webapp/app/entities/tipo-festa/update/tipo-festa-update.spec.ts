import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TipoFestaService } from '../service/tipo-festa.service';
import { ITipoFesta } from '../tipo-festa.model';

import { TipoFestaFormService } from './tipo-festa-form.service';
import { TipoFestaUpdate } from './tipo-festa-update';

describe('TipoFesta Management Update Component', () => {
  let comp: TipoFestaUpdate;
  let fixture: ComponentFixture<TipoFestaUpdate>;
  let activatedRoute: ActivatedRoute;
  let tipoFestaFormService: TipoFestaFormService;
  let tipoFestaService: TipoFestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(TipoFestaUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoFestaFormService = TestBed.inject(TipoFestaFormService);
    tipoFestaService = TestBed.inject(TipoFestaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const tipoFesta: ITipoFesta = { id: 10605 };

      activatedRoute.data = of({ tipoFesta });
      comp.ngOnInit();

      expect(comp.tipoFesta).toEqual(tipoFesta);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoFesta>();
      const tipoFesta = { id: 12172 };
      vitest.spyOn(tipoFestaFormService, 'getTipoFesta').mockReturnValue(tipoFesta);
      vitest.spyOn(tipoFestaService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoFesta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tipoFesta);
      saveSubject.complete();

      // THEN
      expect(tipoFestaFormService.getTipoFesta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoFestaService.update).toHaveBeenCalledWith(expect.objectContaining(tipoFesta));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoFesta>();
      const tipoFesta = { id: 12172 };
      vitest.spyOn(tipoFestaFormService, 'getTipoFesta').mockReturnValue({ id: null });
      vitest.spyOn(tipoFestaService, 'create').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoFesta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tipoFesta);
      saveSubject.complete();

      // THEN
      expect(tipoFestaFormService.getTipoFesta).toHaveBeenCalled();
      expect(tipoFestaService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoFesta>();
      const tipoFesta = { id: 12172 };
      vitest.spyOn(tipoFestaService, 'update').mockReturnValue(saveSubject);
      vitest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoFesta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoFestaService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
