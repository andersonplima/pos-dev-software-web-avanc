import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IPedido } from '../pedido.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../pedido.test-samples';

import { PedidoService, RestPedido } from './pedido.service';

const requireRestSample: RestPedido = {
  ...sampleWithRequiredData,
  dataPedido: sampleWithRequiredData.dataPedido?.toJSON(),
};

describe('Pedido Service', () => {
  let service: PedidoService;
  let httpMock: HttpTestingController;
  let expectedResult: IPedido | IPedido[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(PedidoService);
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

    it('should create a Pedido', () => {
      const pedido = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pedido).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pedido', () => {
      const pedido = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pedido).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pedido', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pedido', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Pedido', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests.length).toBe(1);
    });

    describe('addPedidoToCollectionIfMissing', () => {
      it('should add a Pedido to an empty array', () => {
        const pedido: IPedido = sampleWithRequiredData;
        expectedResult = service.addPedidoToCollectionIfMissing([], pedido);
        expect(expectedResult).toEqual([pedido]);
      });

      it('should not add a Pedido to an array that contains it', () => {
        const pedido: IPedido = sampleWithRequiredData;
        const pedidoCollection: IPedido[] = [
          {
            ...pedido,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPedidoToCollectionIfMissing(pedidoCollection, pedido);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pedido to an array that doesn't contain it", () => {
        const pedido: IPedido = sampleWithRequiredData;
        const pedidoCollection: IPedido[] = [sampleWithPartialData];
        expectedResult = service.addPedidoToCollectionIfMissing(pedidoCollection, pedido);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pedido);
      });

      it('should add only unique Pedido to an array', () => {
        const pedidoArray: IPedido[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pedidoCollection: IPedido[] = [sampleWithRequiredData];
        expectedResult = service.addPedidoToCollectionIfMissing(pedidoCollection, ...pedidoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pedido: IPedido = sampleWithRequiredData;
        const pedido2: IPedido = sampleWithPartialData;
        expectedResult = service.addPedidoToCollectionIfMissing([], pedido, pedido2);
        expect(expectedResult).toEqual([pedido, pedido2]);
      });

      it('should accept null and undefined values', () => {
        const pedido: IPedido = sampleWithRequiredData;
        expectedResult = service.addPedidoToCollectionIfMissing([], null, pedido, undefined);
        expect(expectedResult).toEqual([pedido]);
      });

      it('should return initial array if no Pedido is added', () => {
        const pedidoCollection: IPedido[] = [sampleWithRequiredData];
        expectedResult = service.addPedidoToCollectionIfMissing(pedidoCollection, undefined, null);
        expect(expectedResult).toEqual(pedidoCollection);
      });
    });

    describe('comparePedido', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePedido(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 24162 };
        const entity2 = null;

        const compareResult1 = service.comparePedido(entity1, entity2);
        const compareResult2 = service.comparePedido(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 24162 };
        const entity2 = { id: 19016 };

        const compareResult1 = service.comparePedido(entity1, entity2);
        const compareResult2 = service.comparePedido(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 24162 };
        const entity2 = { id: 24162 };

        const compareResult1 = service.comparePedido(entity1, entity2);
        const compareResult2 = service.comparePedido(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
