import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITipoFesta } from '../tipo-festa.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../tipo-festa.test-samples';

import { TipoFestaService } from './tipo-festa.service';

const requireRestSample: ITipoFesta = {
  ...sampleWithRequiredData,
};

describe('TipoFesta Service', () => {
  let service: TipoFestaService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoFesta | ITipoFesta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TipoFestaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TipoFesta', () => {
      const tipoFesta = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoFesta).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoFesta', () => {
      const tipoFesta = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoFesta).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoFesta', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoFesta', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoFesta', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addTipoFestaToCollectionIfMissing', () => {
      it('should add a TipoFesta to an empty array', () => {
        const tipoFesta: ITipoFesta = sampleWithRequiredData;
        expectedResult = service.addTipoFestaToCollectionIfMissing([], tipoFesta);
        expect(expectedResult).toEqual([tipoFesta]);
      });

      it('should not add a TipoFesta to an array that contains it', () => {
        const tipoFesta: ITipoFesta = sampleWithRequiredData;
        const tipoFestaCollection: ITipoFesta[] = [
          {
            ...tipoFesta,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoFestaToCollectionIfMissing(tipoFestaCollection, tipoFesta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoFesta to an array that doesn't contain it", () => {
        const tipoFesta: ITipoFesta = sampleWithRequiredData;
        const tipoFestaCollection: ITipoFesta[] = [sampleWithPartialData];
        expectedResult = service.addTipoFestaToCollectionIfMissing(tipoFestaCollection, tipoFesta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoFesta);
      });

      it('should add only unique TipoFesta to an array', () => {
        const tipoFestaArray: ITipoFesta[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoFestaCollection: ITipoFesta[] = [sampleWithRequiredData];
        expectedResult = service.addTipoFestaToCollectionIfMissing(tipoFestaCollection, ...tipoFestaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoFesta: ITipoFesta = sampleWithRequiredData;
        const tipoFesta2: ITipoFesta = sampleWithPartialData;
        expectedResult = service.addTipoFestaToCollectionIfMissing([], tipoFesta, tipoFesta2);
        expect(expectedResult).toEqual([tipoFesta, tipoFesta2]);
      });

      it('should accept null and undefined values', () => {
        const tipoFesta: ITipoFesta = sampleWithRequiredData;
        expectedResult = service.addTipoFestaToCollectionIfMissing([], null, tipoFesta, undefined);
        expect(expectedResult).toEqual([tipoFesta]);
      });

      it('should return initial array if no TipoFesta is added', () => {
        const tipoFestaCollection: ITipoFesta[] = [sampleWithRequiredData];
        expectedResult = service.addTipoFestaToCollectionIfMissing(tipoFestaCollection, undefined, null);
        expect(expectedResult).toEqual(tipoFestaCollection);
      });
    });

    describe('compareTipoFesta', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoFesta(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 12172 };
        const entity2 = null;

        const compareResult1 = service.compareTipoFesta(entity1, entity2);
        const compareResult2 = service.compareTipoFesta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 12172 };
        const entity2 = { id: 10605 };

        const compareResult1 = service.compareTipoFesta(entity1, entity2);
        const compareResult2 = service.compareTipoFesta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 12172 };
        const entity2 = { id: 12172 };

        const compareResult1 = service.compareTipoFesta(entity1, entity2);
        const compareResult2 = service.compareTipoFesta(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
