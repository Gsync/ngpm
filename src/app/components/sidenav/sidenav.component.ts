import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showSidenav: boolean;
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.subscribe(store => {
      if (store.store.showSidenav === undefined) {
        this.showSidenav = true;
      } else {
        this.showSidenav = store.store.showSidenav;
      }
      console.log(store.store);
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
