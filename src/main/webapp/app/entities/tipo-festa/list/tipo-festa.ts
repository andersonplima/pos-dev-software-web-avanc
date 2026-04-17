import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription, combineLatest, filter, tap } from 'rxjs';

import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { TipoFestaDeleteDialog } from '../delete/tipo-festa-delete-dialog';
import { TipoFestaService } from '../service/tipo-festa.service';
import { ITipoFesta } from '../tipo-festa.model';

@Component({
  selector: 'jhi-tipo-festa',
  templateUrl: './tipo-festa.html',
  imports: [
    RouterLink,
    FormsModule,
    FontAwesomeModule,
    AlertError,
    Alert,
    SortDirective,
    SortByDirective,
    TranslateDirective,
    TranslateModule,
  ],
})
export class TipoFesta implements OnInit {
  subscription: Subscription | null = null;
  readonly tipoFestas = signal<ITipoFesta[]>([]);

  sortState = sortStateSignal({});

  readonly router = inject(Router);
  protected readonly tipoFestaService = inject(TipoFestaService);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly isLoading = this.tipoFestaService.tipoFestasResource.isLoading;
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly sortService = inject(SortService);
  protected modalService = inject(NgbModal);

  constructor() {
    effect(() => {
      this.tipoFestas.set(this.fillComponentAttributesFromResponseBody([...this.tipoFestaService.tipoFestas()]));
    });
  }

  trackId = (item: ITipoFesta): number => this.tipoFestaService.getTipoFestaIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (this.tipoFestas().length === 0) {
            this.load();
          }
        }),
      )
      .subscribe();
  }

  delete(tipoFesta: ITipoFesta): void {
    const modalRef = this.modalService.open(TipoFestaDeleteDialog, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoFesta = tipoFesta;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend();
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected refineData(data: ITipoFesta[]): ITipoFesta[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: ITipoFesta[]): ITipoFesta[] {
    return this.refineData(data);
  }

  protected queryBackend(): void {
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    this.tipoFestaService.tipoFestasParams.set(queryObject);
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }
}
