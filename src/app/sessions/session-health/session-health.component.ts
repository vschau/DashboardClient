import { Component, OnInit } from '@angular/core';
import { IServer } from 'src/app/models/IServer';

const SAMPLE_SERVER: IServer[] = [
  { id: 1, name: 'dev', isOnline: true },
  { id: 2, name: 'qa', isOnline: false },
  { id: 3, name: 'preprd', isOnline: true },
  { id: 4, name: 'prod', isOnline: true },
];

@Component({
  selector: 'app-session-health',
  templateUrl: './session-health.component.html',
  styleUrls: ['./session-health.component.css']
})
export class SessionHealthComponent implements OnInit {
  servers: IServer[] = SAMPLE_SERVER;

  constructor() { }

  ngOnInit() {
  }

}
