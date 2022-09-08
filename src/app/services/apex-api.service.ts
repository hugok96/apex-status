import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, queue} from "rxjs";
import * as delay from "delay";
import {MapRotations} from "../interfaces/api/MapRotations";
import {CraftingRotation} from "../interfaces/api/CraftingRotation";
import {Servers} from "../interfaces/api/ServerStatus";

@Injectable({
  providedIn: 'root'
})
export class ApexApiService {
    private readonly apiKey : string = '8bd4666f4061807a60e0225c14b113c3';
    private readonly baseUrl : string = "https://api.mozambiquehe.re/";

    private readonly queue : (() => Promise<void>)[] = [];
    private queueInProcess : boolean = false;
    private lastRequestTime : any = null;
    private readonly rateLimit : number = 2000; // rate limit of 1 req per 2000ms

    constructor(private http : HttpClient) {
        setInterval(() => this.processQueue(), 100);
    }

    private async processQueue() : Promise<void> {
        if(this.queueInProcess && this.queue.length > 0)
            return;

        this.queueInProcess = true;
        const operation = this.queue.shift();

        if(this.lastRequestTime !== null) {
            const timeDiff = (this.lastRequestTime + this.rateLimit) - new Date().getTime();
            if(timeDiff > 0)
                await delay(timeDiff);
        }


        if(operation !== undefined) {
            operation().then(() => {
                console.log('hi2')
                this.queueInProcess = false;
                this.lastRequestTime = new Date().getTime();
            }).catch(() => {
                console.log('hi3')
                this.queueInProcess = false;
                this.lastRequestTime = new Date().getTime();
                this.queue.unshift(operation);
            })
        }

    }

    private addUrlToQueue(url : string) : Observable<any> {
        return new Observable<any>(observer => {
            this.queue.push(() => new Promise((resolve, reject) => {
                this.http.get(url).subscribe(
                    res => {
                        observer.next(res)
                        observer.complete();
                        resolve();
                    },
                    err => {
                        //observer.error(err);
                        reject();
                    }
                );
            }));
        });
    }

    public getMapRotations() : () => Observable<MapRotations> {
        return () => this.addUrlToQueue(`${this.baseUrl}maprotation?auth=${this.apiKey}&version=2`);
    }

    public getCraftingRotations() : () => Observable<CraftingRotation[]> {
        return () => this.addUrlToQueue(`${this.baseUrl}crafting?auth=${this.apiKey}`);
    }

    public getServerStatus() : () => Observable<Servers> {
        return () => this.addUrlToQueue(`${this.baseUrl}servers?auth=${this.apiKey}`);
    }
}
