import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FestaDetail } from './festa-detail';

describe('Festa Management Detail Component', () => {
  let comp: FestaDetail;
  let fixture: ComponentFixture<FestaDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./festa-detail').then(m => m.FestaDetail),
              resolve: { festa: () => of({ id: 19278 }) },
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
    fixture = TestBed.createComponent(FestaDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load festa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FestaDetail);

      // THEN
      expect(instance.festa()).toEqual(expect.objectContaining({ id: 19278 }));
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
