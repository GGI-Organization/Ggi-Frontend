import { Component } from '@angular/core';

export interface PeriodicElement {
  task: string, 
  mockup: string,
  delete: boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  {task: 'Task 1', mockup: 'Upload Mockup 1', delete: false},
  {task: 'Task 2', mockup: 'Upload Mockup 2', delete: false},
  {task: 'Task 3', mockup: 'Upload Mockup 3', delete: false},
  {task: 'Task 4', mockup: 'Upload Mockup 4', delete: false},
  {task: 'Task 5', mockup: 'Upload Mockup 5', delete: false},
  {task: 'Task 6', mockup: 'Upload Mockup 6', delete: false},
  {task: 'Task 7', mockup: 'Upload Mockup 7', delete: false},
];

@Component({
  selector: 'app-upload-mockups',
  templateUrl: './upload-mockups.component.html',
  styleUrls: ['./upload-mockups.component.css']
})
export class UploadMockupsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
}
