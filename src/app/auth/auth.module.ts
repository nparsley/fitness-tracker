import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports:[
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AngularFireAuthModule
  ]
})
export class AuthModule {}
