import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { DisplayService } from '../display.service';

export class Quantity {
  id: string;
  name: string;
  unit: string;
}

@Component({
  selector: 'app-quantity-list',
  templateUrl: './quantity-list.component.html',
  styleUrls: ['./quantity-list.component.css']
})
export class QuantityListComponent implements OnInit {

  @Input() public sensorId: any;

  quantities: Observable<Quantity[]>;

  constructor(public authService: AuthService, public db: AngularFirestore, public displayService: DisplayService) {
  }

  ngOnInit() {
    this.quantities = this.db.collection('sensor').doc(this.authService.userId).collection('sensor')
    .doc(this.sensorId).collection<Quantity>('quantity').valueChanges();
  }

  isDisplayed(quantityId) {
    return this.displayService.isDisplayed({sensor: this.sensorId, quantity: quantityId});
  }

  addQuantity(quantityId) {
    this.displayService.addDisplayItem({sensor: this.sensorId, quantity: quantityId});
  }

  deleteQuantity(quantityId) {
    this.displayService.deleteDisplayItem({sensor: this.sensorId, quantity: quantityId});
  }

}
