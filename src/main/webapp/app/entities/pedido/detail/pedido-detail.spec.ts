import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { PedidoDetail } from './pedido-detail';

describe('Pedido Management Detail Component', () => {
  let comp: PedidoDetail;
  let fixture: ComponentFixture<PedidoDetail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./pedido-detail').then(m => m.PedidoDetail),
              resolve: { pedido: () => of({ id: 24162 }) },
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
    fixture = TestBed.createComponent(PedidoDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load pedido on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', PedidoDetail);

      // THEN
      expect(instance.pedido()).toEqual(expect.objectContaining({ id: 24162 }));
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
