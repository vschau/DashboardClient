import { Component, OnInit, OnDestroy } from '@angular/core';
import { IServer } from 'src/app/models/IServer';
import { ServerService } from 'src/app/services/server.service';
import { IServerRequest } from 'src/app/models/IServerRequest';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const SAMPLE_SERVER: IServer[] = [
  { id: 1, name: 'dev', isOnline: true },
  { id: 2, name: 'qa', isOnline: false },
];

@Component({
  selector: 'app-session-health2',
  templateUrl: './session-health.component.html',
  styleUrls: ['./session-health.component.css']
})
export class SessionHealth2Component implements OnInit, OnDestroy {
  servers: IServer[];
  private ngUnsubscribe = new Subject();

  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit() {
    this.servers = this.route.snapshot.data['serverList'];
  }

  onServerStatusChange(request: IServerRequest) {
    this.serverService.updateServerStatus(request)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res) => {
            if (request.payload === 'activate') {
              const index = this.servers.findIndex(s => s.id === request.id);
              this.servers[index] = Object.assign({}, this.servers[index], { isOnline: true });
            } else {
              const index = this.servers.findIndex(s => s.id === request.id);
              this.servers[index] = Object.assign({}, this.servers[index], { isOnline: false });
            }
          },
          (err) => console.log(err)
        );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
