import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  selected: any[] = [];
  rows = [
    { id: 1, installerName: 'Elio Acosta', date: '04-17-2017', time: '10:00', location: 'Doral', address: 'Calle 2', status: 'Active'},
    { id: 2, installerName: 'Jessica Acosta', date: '04-17-2017', time: '10:00', location: 'Doral', address: 'Calle 2', status: 'Canceled'},
    { id: 2, installerName: 'Miguel Pérez', date: '04-17-2017', time: '10:00', location: 'Doral', address: 'Calle 2', status: 'Done'}
  ];
  constructor() { }

  ngOnInit() {
  }

  @ViewChild('childModal') public childModal: ModalDirective;

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }
}
