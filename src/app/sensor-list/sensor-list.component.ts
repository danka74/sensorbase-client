import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { QuantityListComponent } from '../quantity-list/quantity-list.component';

export class Sensor {
  id: string;
  name: string;
  place: string;
}

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {

  sensors: Observable<Sensor[]>;

  constructor(authService: AuthService, db: AngularFirestore) {
    this.sensors = db.collection<Sensor>('sensor/' + authService.userId + '/sensor').valueChanges();
  }

  ngOnInit() {
  }

}
