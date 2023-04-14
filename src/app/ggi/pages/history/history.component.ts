import { Component } from '@angular/core';

interface IHistory {
  name: string,
  type: string,
  created_date: string
}

const ELEMENT_DATA: IHistory[] = [
  { name: 'BPMN Pruebas 1', type: 'Diagrama BPMN', created_date: '01/01/2023' },
  { name: 'BPMN Pruebas 2', type: 'Diagrama BPMN', created_date: '01/01/2023' },
  { name: 'BPMN Pruebas 3', type: 'Diagrama BPMN', created_date: '01/01/2023' },
  { name: 'BPMN Pruebas 4', type: 'Diagrama BPMN', created_date: '01/01/2023' },
  { name: 'BPMN Pruebas 5', type: 'Diagrama BPMN', created_date: '01/01/2023' },
  { name: 'BPMN Pruebas 6', type: 'Diagrama BPMN', created_date: '01/01/2023' },
  { name: 'Mockup Pruebas 1', type: 'Mockup', created_date: '01/01/2023' },
  { name: 'Mockup Pruebas 2', type: 'Mockup', created_date: '01/01/2023' },
  { name: 'Mockup Pruebas 3', type: 'Mockup', created_date: '01/01/2023' },
  { name: 'Mockup Pruebas 4', type: 'Mockup', created_date: '01/01/2023' },
  { name: 'Mockup Pruebas 5', type: 'Mockup', created_date: '01/01/2023' },
  { name: 'Mockup Pruebas 6', type: 'Mockup', created_date: '01/01/2023' },
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  displayedColumns: string[] = ['name', 'type', 'created_date', 'options'];
  dataSource = ELEMENT_DATA;
}
