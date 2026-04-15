import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFesta } from 'app/shared/model/festa.model';

@Component({
  selector: 'jhi-festa-detail',
  templateUrl: './festa-detail.component.html'
})
export class FestaDetailComponent implements OnInit {
  festa: IFesta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ festa }) => (this.festa = festa));
  }

  previousState(): void {
    window.history.back();
  }
}
