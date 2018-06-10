import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DisplayService, DisplayItem } from '../display.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayItems: Observable<DisplayItem[]>;

  constructor(private authService: AuthService, private db: AngularFirestore, public displayService: DisplayService) {
    this.displayItems = db.collection('display').doc(authService.userId).collection<DisplayItem>('display').valueChanges();
  }

  ngOnInit() {
  }

}
