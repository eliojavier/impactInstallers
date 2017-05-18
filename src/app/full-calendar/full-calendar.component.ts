import { Component, OnInit, ViewChild } from '@angular/core';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';


@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }

  events: any[];

  calendarOptions:Object = {
    height: 'parent',
    fixedWeekCount : false,
    defaultDate: '2016-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events

  };

  constructor() { }

  ngOnInit() {
   this.events = [
      {
        id: 888,
        title: 'All Day Event',
        start: '2016-09-01',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
    ]
  }

}
