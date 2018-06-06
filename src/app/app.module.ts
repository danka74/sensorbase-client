import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { EffectuatorListComponent } from './effectuator-list/effectuator-list.component';
import { AdminComponent } from './admin/admin.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { SensorComponent } from './sensor/sensor.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    SensorListComponent,
    EffectuatorListComponent,
    AdminComponent,
    LoginComponent,
    SensorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'sensorbase'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    LayoutModule,
    NgxChartsModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
