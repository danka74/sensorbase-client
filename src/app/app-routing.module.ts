import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { EffectuatorListComponent } from './effectuator-list/effectuator-list.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SensorComponent } from './sensor/sensor.component';

const routes: Routes = [
  { path: 'sensors', component: SensorListComponent },
  { path: 'sensor/:id', component: SensorComponent },
  { path: 'effectuators', component: EffectuatorListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/sensors', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
