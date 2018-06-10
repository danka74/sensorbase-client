import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { map, filter, mapTo } from 'rxjs/operators';

export class DisplayItem {
  sensor: string;
  quantity: string;
}

class DisplayItemId extends DisplayItem {
  id: string;
}
@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  displayItems: AngularFirestoreCollection<DisplayItem>;
  displayItemDetails: DisplayItemId[] = null;

  constructor(public authService: AuthService, public db: AngularFirestore) {
    this.displayItems = db.collection('display').doc(authService.userId).collection<DisplayItem>('display');

    this.displayItemDetails = [];
    this.displayItems.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as DisplayItem;
        const id = a.payload.doc.id;
        return {id, ...data} as DisplayItemId;
      }))).subscribe(dIs => this.displayItemDetails = dIs);
  }

  isDisplayed(displayItem: DisplayItem): Observable<boolean> {
    console.log(displayItem);
    if (this.displayItemDetails != null) {
      return of(this.displayItemDetails.some(dI => dI.sensor === displayItem.sensor && dI.quantity === displayItem.quantity));
    } else {
      return of(false);
    }
  }

  addDisplayItem(displayItem: DisplayItem) {
    console.log('addDisplayItem');
    console.log(this.displayItemDetails);
    if (!this.displayItemDetails.some(dI => dI.sensor === displayItem.sensor && dI.quantity === displayItem.quantity)) {
      console.log('Do add displayItem');
      this.db.collection('display').doc(this.authService.userId).collection<DisplayItem>('display').add(displayItem);
    }
  }

  deleteDisplayItem(displayItem: DisplayItem) {
    const displayItemId = this.displayItemDetails.find(dI => dI.sensor === displayItem.sensor && dI.quantity === displayItem.quantity);
    if (displayItemId !== undefined) {
      this.db.collection('display').doc(this.authService.userId).collection<DisplayItem>('display').doc(displayItemId.id).delete();
    }
  }
}
