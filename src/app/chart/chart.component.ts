import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { DisplayService } from '../display.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LineChartComponent, ChartCommonModule } from '@swimlane/ngx-charts';
import { Sensor } from '../sensor-list/sensor-list.component';
import { Quantity } from '../quantity-list/quantity-list.component';

class Datum {
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
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() sensorId: string;
  @Input() quantityId: string;

  data: Observable<Datum[]> = null;
  name: string = null;
  chartData: ChartData[];

  sensor: Observable<Sensor>;
  quantity: Observable<Quantity>;

  view: any[] = [700, 400];

  constructor(private authService: AuthService, private db: AngularFirestore, private displayService: DisplayService) {
  }

  ngOnInit() {
    this.data =  this.db.collection('data').doc(this.authService.userId).collection(this.sensorId)
      .doc('data').collection<Datum>(this.quantityId).valueChanges();

    this.sensor = this.db.collection('sensor').doc(this.authService.userId).collection('sensor').doc<Sensor>(this.sensorId).valueChanges();

    this.quantity = this.db.collection('sensor').doc(this.authService.userId).collection('sensor').doc(this.sensorId).collection('quantity')
      .doc<Quantity>(this.quantityId).valueChanges();

    this.data.subscribe(_data => {
      this.chartData = [{name: '', series: []}];
      _data.forEach((e) => {
        this.chartData[0].series.push({name: e.t.toDate(), value: e.v});
      });
    });
  }

  deleteDisplayItem() {
    this.displayService.deleteDisplayItem({sensor: this.sensorId, quantity: this.quantityId});
  }
}
