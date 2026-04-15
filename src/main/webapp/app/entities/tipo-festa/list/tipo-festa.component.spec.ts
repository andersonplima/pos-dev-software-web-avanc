import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoFestaService } from '../service/tipo-festa.service';

import { TipoFestaComponent } from './tipo-festa.component';

describe('TipoFesta Management Component', () => {
  let comp: TipoFestaComponent;
  let fixture: ComponentFixture<TipoFestaComponent>;
  let service: TipoFestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'tipo-festa', component: TipoFestaComponent }]), HttpClientTestingModule],
      declarations: [TipoFestaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(TipoFestaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoFestaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoFestaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.tipoFestas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tipoFestaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTipoFestaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTipoFestaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
