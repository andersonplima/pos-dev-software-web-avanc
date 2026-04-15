import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../festa.test-samples';

import { FestaFormService } from './festa-form.service';

describe('Festa Form Service', () => {
  let service: FestaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestaFormService);
  });

  describe('Service methods', () => {
    describe('createFestaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFestaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            tema: expect.any(Object),
            valor: expect.any(Object),
            tipoFesta: expect.any(Object),
            cliente: expect.any(Object),
          })
        );
      });

      it('passing IFesta should create a new form with FormGroup', () => {
        const formGroup = service.createFestaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            tema: expect.any(Object),
            valor: expect.any(Object),
            tipoFesta: expect.any(Object),
            cliente: expect.any(Object),
          })
        );
      });
    });

    describe('getFesta', () => {
      it('should return NewFesta for default Festa initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFestaFormGroup(sampleWithNewData);

        const festa = service.getFesta(formGroup) as any;

        expect(festa).toMatchObject(sampleWithNewData);
      });

      it('should return NewFesta for empty Festa initial value', () => {
        const formGroup = service.createFestaFormGroup();

        const festa = service.getFesta(formGroup) as any;

        expect(festa).toMatchObject({});
      });

      it('should return IFesta', () => {
        const formGroup = service.createFestaFormGroup(sampleWithRequiredData);

        const festa = service.getFesta(formGroup) as any;

        expect(festa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFesta should not enable id FormControl', () => {
        const formGroup = service.createFestaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFesta should disable id FormControl', () => {
        const formGroup = service.createFestaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
