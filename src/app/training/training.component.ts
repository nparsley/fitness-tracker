import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }


