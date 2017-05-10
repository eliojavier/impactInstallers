import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  selected: any[] = [];
  rows = [
    { id: 1, name: 'Doral', state: 'Florida', city: 'Miami', postalCode: '333232', coordinates: '-121.23, 23.32'},
    { id: 2, name: 'Brickell', state: 'Florida', city: 'Miami', postalCode: '333132', coordinates: '-111.23, 25.32'},
    { id: 3, name: 'Miami Beach', state: 'Florida', city: 'Miami', postalCode: '333245', coordinates: '-191.29, 23.32'},
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }

  delete() {
    console.log('delete');
  }
}
