import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FestaDetailComponent } from './festa-detail.component';

describe('Festa Management Detail Component', () => {
  let comp: FestaDetailComponent;
  let fixture: ComponentFixture<FestaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FestaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ festa: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FestaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FestaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load festa on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.festa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
