import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TipoFestaDetail } from './tipo-festa-detail';

describe('TipoFesta Management Detail Component', () => {
  let comp: TipoFestaDetail;
  let fixture: ComponentFixture<TipoFestaDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./tipo-festa-detail').then(m => m.TipoFestaDetail),
              resolve: { tipoFesta: () => of({ id: 12172 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
    const library = TestBed.inject(FaIconLibrary);
    library.addIcons(faArrowLeft);
    library.addIcons(faPencilAlt);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoFestaDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load tipoFesta on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoFestaDetail);

      // THEN
      expect(instance.tipoFesta()).toEqual(expect.objectContaining({ id: 12172 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      vitest.spyOn(globalThis.history, 'back');
      comp.previousState();
      expect(globalThis.history.back).toHaveBeenCalled();
    });
  });
});
