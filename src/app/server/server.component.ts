import { Component, OnInit, Input } from '@angular/core';
import { IServer } from '../models/IServer';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  color: string;
  buttonText: string;
  serverStatus: string; // Use this to translate server.isOnline from bool to string
  @Input() server: IServer;

  constructor() { }

  ngOnInit(): void {
    this.setServerStatus(this.server.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (this.server.isOnline) {
      this.server.isOnline = false;
      this.serverStatus = 'Online';
      this.color = '#66BB6A',
      this.buttonText = 'Shut Down';
    } else {
      this.server.isOnline = true;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toggleStatus() {
    this.setServerStatus(!this.server.isOnline);
  }
}
