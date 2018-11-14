import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { DataService } from '../../services/data.service';
import { Subscription, Observable, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  activity: Activity;
  activityInProgress = false;
  timeTakenInSeconds = 0;
  activityTimerSub: Subscription;
  activityUpdateSub: Subscription;
  timer$ = timer(0, 1000);
  sub: Subscription;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.dataService.currentActivityChanges$.subscribe(data => {
      this.activity = data;
      console.log('currentActivity: ', this.activity);
    });
  }
  ngAfterViewInit() {
    if (!this.activity._id) {
      // TODO: get activity by id
      console.log('No activity available');
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.activityInProgress) {
      this.activityTimerSub.unsubscribe();
    }
  }
  startActivity() {
    if (!this.activityInProgress) {
      this.activityTimerSub = this.timer$.subscribe(() => {
        this.timeTakenInSeconds++;
      });
    }
    this.activityInProgress = true;
  }
  async stopActivity() {
    await this.updateTimeSpent();
    this.updateActivity(this.route.snapshot.params.id, this.activity);
    this.activityReset();
  }
  updateTimeSpent() {
    this.activity.hoursWorked =
      this.activity.hoursWorked + this.timeTakenInSeconds;
  }
  activityReset() {
    this.activityTimerSub.unsubscribe();
    this.timeTakenInSeconds = 0;
    this.activityInProgress = false;
  }
  updateActivity(projectId: string, activity: Activity): void {
    this.activityUpdateSub = this.dataService
      .updateActivity(projectId, activity)
      .pipe(take(1))
      .subscribe();
  }
  displayTimeElapsed() {
    return (
      Math.floor(this.timeTakenInSeconds / 3600) +
      ':' +
      Math.floor(this.timeTakenInSeconds / 60) +
      ':' +
      Math.floor(this.timeTakenInSeconds % 60)
    );
  }
}
