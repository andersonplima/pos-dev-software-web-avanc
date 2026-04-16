import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoFestaDetailComponent } from './tipo-festa-detail.component';

describe('TipoFesta Management Detail Component', () => {
  let comp: TipoFestaDetailComponent;
  let fixture: ComponentFixture<TipoFestaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFestaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./tipo-festa-detail.component').then(m => m.TipoFestaDetailComponent),
              resolve: { tipoFesta: () => of({ id: 12172 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoFestaDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoFestaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load tipoFesta on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoFestaDetailComponent);

      // THEN
      expect(instance.tipoFesta()).toEqual(expect.objectContaining({ id: 12172 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
