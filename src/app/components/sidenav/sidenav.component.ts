import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showSidenav: boolean;
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select('appState').subscribe(store => {
      this.showSidenav = store.showSidenav;
      console.log(store);
    });
  }

  toggleSidenav(): void {
    this.showSidenav = !this.showSidenav;
    this.store.dispatch({
      type: 'TOGGLE_SIDENAV',
      payload: this.showSidenav
    });
  }
}
