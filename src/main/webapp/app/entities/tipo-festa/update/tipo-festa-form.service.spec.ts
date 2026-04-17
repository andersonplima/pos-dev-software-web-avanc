import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../tipo-festa.test-samples';

import { TipoFestaFormService } from './tipo-festa-form.service';

describe('TipoFesta Form Service', () => {
  let service: TipoFestaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFestaFormService);
  });

  describe('Service methods', () => {
    describe('createTipoFestaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoFestaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });

      it('passing ITipoFesta should create a new form with FormGroup', () => {
        const formGroup = service.createTipoFestaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoFesta', () => {
      it('should return NewTipoFesta for default TipoFesta initial value', () => {
        const formGroup = service.createTipoFestaFormGroup(sampleWithNewData);

        const tipoFesta = service.getTipoFesta(formGroup) as any;

        expect(tipoFesta).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoFesta for empty TipoFesta initial value', () => {
        const formGroup = service.createTipoFestaFormGroup();

        const tipoFesta = service.getTipoFesta(formGroup) as any;

        expect(tipoFesta).toMatchObject({});
      });

      it('should return ITipoFesta', () => {
        const formGroup = service.createTipoFestaFormGroup(sampleWithRequiredData);

        const tipoFesta = service.getTipoFesta(formGroup) as any;

        expect(tipoFesta).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoFesta should not enable id FormControl', () => {
        const formGroup = service.createTipoFestaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoFesta should disable id FormControl', () => {
        const formGroup = service.createTipoFestaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
