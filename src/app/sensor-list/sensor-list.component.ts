import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

export class Sensor {
  id: String;
  name: String;
}

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {

  public sensors: Observable<Sensor[]>;

  constructor(authService: AuthService, db: AngularFirestore) {
    this.sensors = db.collection<Sensor>('sensor/' + authService.userId + '/sensors').valueChanges();
  }

  ngOnInit() {
  }

}
