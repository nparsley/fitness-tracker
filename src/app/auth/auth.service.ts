import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';


@Injectable()
export class AuthService {

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
    ) {}

    initAuthListener() {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscriptions();
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.router.navigate(['/login']);
        }
      });
    }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      this.store.dispatch(new UI.StartLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout() {
    this.afAuth.signOut();
  }

}
