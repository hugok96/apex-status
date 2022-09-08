import { Component, OnInit } from '@angular/core';
import {Servers, ServerStatus} from "../../interfaces/api/ServerStatus";
import {ApexApiService} from "../../services/apex-api.service";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.sass']
})
export class ServersComponent implements OnInit {
    public normalizedServers : {name: string, children: {name: string, status: ServerStatus}[]}[] = [];
    public loading : boolean = true;

    constructor(private api : ApexApiService) { }

    ngOnInit(): void {
        this.api.getServerStatus()().subscribe((servers => {
            for(let i in servers) {
                if(!servers.hasOwnProperty(i))
                    continue;

                let server: {name: string, children: {name: string, status: ServerStatus}[]} = {name: i, children: []};
                for(let j in servers[i]) {
                    if (!servers.hasOwnProperty(i))
                        continue

                    server.children.push({name: j, status: servers[i][j]})
                }
                this.normalizedServers.push(server);
            }
            this.loading = false;
        }));
    }

}
