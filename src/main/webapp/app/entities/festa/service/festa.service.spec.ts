import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFesta } from '../festa.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../festa.test-samples';

import { FestaService } from './festa.service';

const requireRestSample: IFesta = {
  ...sampleWithRequiredData,
};

describe('Festa Service', () => {
  let service: FestaService;
  let httpMock: HttpTestingController;
  let expectedResult: IFesta | IFesta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FestaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Festa', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const festa = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(festa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Festa', () => {
      const festa = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(festa).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Festa', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Festa', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Festa', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFestaToCollectionIfMissing', () => {
      it('should add a Festa to an empty array', () => {
        const festa: IFesta = sampleWithRequiredData;
        expectedResult = service.addFestaToCollectionIfMissing([], festa);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(festa);
      });

      it('should not add a Festa to an array that contains it', () => {
        const festa: IFesta = sampleWithRequiredData;
        const festaCollection: IFesta[] = [
          {
            ...festa,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFestaToCollectionIfMissing(festaCollection, festa);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Festa to an array that doesn't contain it", () => {
        const festa: IFesta = sampleWithRequiredData;
        const festaCollection: IFesta[] = [sampleWithPartialData];
        expectedResult = service.addFestaToCollectionIfMissing(festaCollection, festa);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(festa);
      });

      it('should add only unique Festa to an array', () => {
        const festaArray: IFesta[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const festaCollection: IFesta[] = [sampleWithRequiredData];
        expectedResult = service.addFestaToCollectionIfMissing(festaCollection, ...festaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const festa: IFesta = sampleWithRequiredData;
        const festa2: IFesta = sampleWithPartialData;
        expectedResult = service.addFestaToCollectionIfMissing([], festa, festa2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(festa);
        expect(expectedResult).toContain(festa2);
      });

      it('should accept null and undefined values', () => {
        const festa: IFesta = sampleWithRequiredData;
        expectedResult = service.addFestaToCollectionIfMissing([], null, festa, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(festa);
      });

      it('should return initial array if no Festa is added', () => {
        const festaCollection: IFesta[] = [sampleWithRequiredData];
        expectedResult = service.addFestaToCollectionIfMissing(festaCollection, undefined, null);
        expect(expectedResult).toEqual(festaCollection);
      });
    });

    describe('compareFesta', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFesta(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFesta(entity1, entity2);
        const compareResult2 = service.compareFesta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFesta(entity1, entity2);
        const compareResult2 = service.compareFesta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFesta(entity1, entity2);
        const compareResult2 = service.compareFesta(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
