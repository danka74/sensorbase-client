import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LineChartComponent, ChartCommonModule } from '@swimlane/ngx-charts';

class Sensor {
  id: string;
  name: string;
}

class Datum {
  q: string;
  v: number;
  t: firebase.firestore.Timestamp;
}

class ChartDatum {
  name: Date;
  value: number;
}

class ChartData {
  name: string;
  series: Array<ChartDatum>;
}

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  sensor: Observable<Sensor> = null;
  data: Observable<Datum[]> = null;
  name: string = null;
  chartData: ChartData[];
  quantityIds: string[];
  showQuantity: string[];

  constructor(private authService: AuthService, private db: AngularFirestore, private route: ActivatedRoute) {
    Object.assign(this, this.chartData );
  }

  ngOnInit() {
    this.sensor = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.db.collection('sensor').doc(this.authService.userId).collection('sensors').doc<Sensor>(params.get('id')).valueChanges();
      }));

    this.data = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('this.data');
        const x = this.db.collection('data').doc(this.authService.userId).collection<Datum>('40').valueChanges();
        console.log(x);
        return x;
      }));

    this.sensor.subscribe((_sensor) => {
      this.name = _sensor.name;
    });

    this.data.subscribe((_data) => {
      this.quantityIds = [];
      this.chartData = [];
      _data.forEach((e) => {
        if (!this.chartData.find((d) => d.name === e.q)) {
          this.chartData.push({name: e.q, series: []});
          this.quantityIds.push(e.q);
        }
        this.chartData.find((d) => d.name === e.q).series.push({name: e.t.toDate(), value: e.v});
      });
      console.log(this.chartData);
    });
  }

  checkQuantity(event, qId) {
    console.log(event);
    const index = this.quantityIds.indexOf(qId);
    if (index > 0) {
      this.quantityIds = this.quantityIds.filter(item => item !== qId);
    } else {
      this.quantityIds.push(qId);
    }
  }

}
