import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesCarouselComponent } from './images-carousel/images-carousel.component';
import {StoreModule} from '@ngrx/store';
import { reducers } from './reducers';
import { ArticleEffects } from './effects/articulo.effects';
import { EffectsModule } from '@ngrx/effects';
import { ArticuloService } from './services/articulo.service';
import { UsuarioService } from './services/usuario.service';
import { UsuarioEffects } from './effects/usuario.effects';

import { LightboxModule } from 'ngx-lightbox';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [AppComponent, LoginComponent, ImagesCarouselComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ArticleEffects, UsuarioEffects]),
    provideFirestore(() => getFirestore()),
    NgbModule,
    ReactiveFormsModule,
    LightboxModule,
    SweetAlert2Module.forRoot(),
    LazyLoadImageModule
  ],
  providers: [ArticuloService, UsuarioService],
  bootstrap: [AppComponent, LoginComponent],
})
export class AppModule {}
