import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
  template: `
    <div class="container">
      <label id="hey" for="picker">Event Color: </label>
      <input type="color" name="picker" [(ngModel)]="calOptions.eventColor" (change)="eventColorChanged($event)">

      <div class="row" style="margin-top: 8px">
        <div class="col-md-12">

          <button class="btn btn-success btn-sm" (click)="add()"><i class="fa fa-plus" aria-hidden="true"></i></button>

        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div id='calendar'></div>
        </div>
      </div>

      <div class="row">
        <ul>
          <li *ngFor="let entry of log">
            {{ entry  }}
          </li>
        </ul>
      </div>

    </div>
  `
})
export class AssignmentsComponent implements OnInit {
  eventColor = '#ff659f';
  calElement = null;
  log: string[] = [];
  eventlist: any[] = [
    {
      title  : 'test title',
      description  : 'event1',
      start  : '2016-12-07 13:00',
      end    : '2016-12-07 17:00',
      type: 'event'
    },
    {
      title  : '',
      description: 'event2',
      start  : '2016-12-05 10:00',
      end    : '2016-12-07',
      type: 'staff'
    },
    {
      title  : '',
      description: 'event3',
      start  : '2016-12-09T12:30:00',
      allDay : false, // will make the time show
      type: 'meeting'
    }
  ];

  calOptions = {
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,basicWeek,basicDay listWeek'
    },
    defaultView: 'month',
    eventColor: this.eventColor,
    events: this.eventlist,
    eventRender: (event, element) => {
      this.log.push('Rendering Event');
      $(element).addClass('calEvent');
    },
    eventClick: function(calEvent, jsEvent, view) {

      // alert('Event: ' + calEvent.title);
      // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
      // alert('View: ' + view.name);

      // change the border color just for fun
      $(this).css('border-color', 'blue');

    }
  };

  constructor() { }

  ngOnInit() {
    this.log.push('Start of ngOnInit()');

    this.calElement = $('#calendar');
    this.calElement.fullCalendar(this.calOptions);

    this.log.push('End of ngOnInit()');
  }

  next() {
    this.calElement.fullCalendar('next');
  }
  prev() {
    this.calElement.fullCalendar('prev');
  }
  add() {
    const newEvent = {
      title: 'New Event',
      start: '2016-12-10',
      description: 'Added Event',
      type: 'eVenT'
    };
    this.eventlist.push(newEvent);
    this.calElement.fullCalendar( 'renderEvent', newEvent);
  }
  eventColorChanged(clickevent) {
    this.calElement.fullCalendar( 'destroy' );
    this.calElement.fullCalendar(this.calOptions);
  }
}
