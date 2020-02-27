import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IServer } from '../models/IServer';
import { ServerService } from './server.service';

@Injectable()
export class ServerResolver implements Resolve<IServer[]> {
    constructor(private serverService: ServerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IServer[]> {
        return this.serverService.getServers();
    }
}

