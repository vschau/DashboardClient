import { IServerRequest } from './../models/IServerRequest';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, IterableDiffers, DoCheck } from '@angular/core';
import { IServer } from '../models/IServer';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnChanges {
  color: string;
  buttonText: string;
  serverStatus: string;
  iterableDiffer: any;

  @Input() server: IServer;
  @Output() serverStatusChange = new EventEmitter<IServerRequest>();

  constructor() {
  }

  ngOnInit(): void {
    this.setServerStatus(this.server.isOnline);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.server) {
      this.setServerStatus(changes.server.currentValue.isOnline);
    }
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.server.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A',
      this.buttonText = 'Shut Down';
    } else {
      this.server.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toggleStatus() {
    const payload = this.buildPayload(this.server.isOnline);
    this.serverStatusChange.emit(payload);
  }

  buildPayload(isOnline: boolean): IServerRequest {
    if (isOnline) {
      return {
        id: this.server.id,
        payload: 'deactivate'
      };
    } else {
      return {
        id: this.server.id,
        payload: 'activate'
      };
    }
  }
}
