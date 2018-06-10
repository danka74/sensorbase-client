import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { EffectuatorListComponent } from './effectuator-list/effectuator-list.component';
import { AdminComponent } from './admin/admin.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuantityListComponent } from './quantity-list/quantity-list.component';
import { DisplayService } from './display.service';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    SensorListComponent,
    EffectuatorListComponent,
    AdminComponent,
    LoginComponent,
    QuantityListComponent,
    ChartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'sensorbase'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    LayoutModule,
    NgxChartsModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule
  ],
  providers: [AuthService, DisplayService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
    console.log(environment);
  }
}
