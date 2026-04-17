import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { FestaDetailComponent } from './festa-detail.component';

describe('Festa Management Detail Component', () => {
  let comp: FestaDetailComponent;
  let fixture: ComponentFixture<FestaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./festa-detail.component').then(m => m.FestaDetailComponent),
              resolve: { festa: () => of({ id: 19278 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FestaDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FestaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load festa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FestaDetailComponent);

      // THEN
      expect(instance.festa()).toEqual(expect.objectContaining({ id: 19278 }));
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
