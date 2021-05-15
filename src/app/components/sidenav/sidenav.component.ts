import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducer";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  showSidenav: boolean;
  @ViewChild("sidenav", { static: true })
  sidenav: MatSidenav;
  constructor(
    private store: Store<State>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 768px"); // size of an ipad
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      if (this.mobileQuery.matches) {
        this.showSidenav = false;
      } else {
        this.showSidenav = true;
      }
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // comment: use selector here from reducer
    // this.store.select("appState").subscribe((store) => {
    //   this.showSidenav = store.showSidenav;
    //   console.log(store);
    // });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  // TODO: Update the store state to use showSidnav or remove it
  toggleSidenav(): void {
    this.showSidenav = !this.showSidenav;
    this.store.dispatch({
      type: "TOGGLE_SIDENAV",
      payload: this.showSidenav,
    });
  }
}
